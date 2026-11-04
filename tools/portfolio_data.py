#!/usr/bin/env python3
"""Canonical data tool for the credentials portfolio.

`credentials_master.json` is the single source of truth. This script:

  * validates the canonical dataset (structure, uniqueness, statuses, URLs),
  * regenerates `credentials_master.csv` from it (`--write`),
  * verifies CSV/JSON parity and that `app.js` no longer embeds a dataset,
  * compares the dataset against an explicit expected baseline so that any
    change is a deliberate, visible decision rather than silent drift.

Usage:
    python tools/portfolio_data.py            # validate (exit 1 on any problem)
    python tools/portfolio_data.py --write    # regenerate CSV, then validate
    python tools/portfolio_data.py --allow-change   # accept a new baseline
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "credentials_master.json"
CSV_PATH = ROOT / "credentials_master.csv"
APP_PATH = ROOT / "app.js"

REQUIRED_FIELDS = {
    "number", "id", "title", "institution", "type", "date",
    "category", "direct_url", "status",
}
VALID_STATUSES = {"VERIFIED", "ACCOUNT-SCOPED"}
VALID_TYPES = {"Specialization", "Professional Certificate", "Course"}
COURSE_URL = re.compile(r"^https://(www\.)?coursera\.org/account/accomplishments/")

# Expected baseline at this revision. Update deliberately (with --allow-change)
# whenever a credential is legitimately added or removed.
BASELINE = {
    "total": 42,
    "publicly_verified": 36,
    "account_scoped": 6,
    "specializations_and_professional_certificates": 6,
    "courses": 36,
    "standalone_courses": 12,
    "component_courses": 24,
    "shared_component_entries": 3,
}

CSV_COLUMNS = [
    "number", "title", "institution", "completion_date", "credential_type",
    "credential_id", "direct_verification_url", "public_share_url",
    "verification_status", "subject_category",
]


class Problems(list):
    def add(self, msg: str) -> None:
        self.append(msg)

    def report(self, label: str) -> bool:
        if not self:
            print(f"  OK   {label}")
            return True
        print(f"  FAIL {label}")
        for m in self:
            print(f"         - {m}")
        return False


def load_json() -> list[dict]:
    with JSON_PATH.open(encoding="utf-8") as fh:
        data = json.load(fh)
    if not isinstance(data, list):
        raise SystemExit("credentials_master.json must contain a JSON array")
    return data


def compute(data: list[dict]) -> dict:
    component_entries = [cc for r in data for cc in (r.get("component_courses") or [])]
    component_ids = {cc["id"] for cc in component_entries}
    top_course_ids = {r["id"] for r in data if r.get("type") == "Course"}
    categories = {}
    for r in data:
        categories[r["category"]] = categories.get(r["category"], 0) + 1
    return {
        "total": len(data),
        "publicly_verified": sum(1 for r in data if r.get("status") == "VERIFIED"),
        "account_scoped": sum(1 for r in data if r.get("status") == "ACCOUNT-SCOPED"),
        "specializations_and_professional_certificates": sum(
            1 for r in data if r.get("type") in {"Specialization", "Professional Certificate"}),
        "courses": sum(1 for r in data if r.get("type") == "Course"),
        "component_entries": len(component_entries),
        "component_courses": len(component_ids),
        "shared_component_entries": len(component_entries) - len(component_ids),
        "standalone_courses": len(top_course_ids - component_ids),
        "categories": categories,
        "component_ids_not_in_courses": sorted(component_ids - top_course_ids),
    }


def write_csv(data: list[dict]) -> None:
    buf = io.StringIO()
    writer = csv.DictWriter(buf, fieldnames=CSV_COLUMNS, lineterminator="\r\n")
    writer.writeheader()
    for r in data:
        writer.writerow({
            "number": r.get("number", ""),
            "title": r["title"],
            "institution": r["institution"],
            "completion_date": r["date"],
            "credential_type": r["type"],
            "credential_id": r["id"],
            "direct_verification_url": r["direct_url"],
            "public_share_url": r.get("share_url", ""),
            "verification_status": r["status"],
            "subject_category": r["category"],
        })
    CSV_PATH.write_text(buf.getvalue(), encoding="utf-8", newline="")


def read_csv() -> list[dict]:
    if not CSV_PATH.exists():
        return []
    with CSV_PATH.open(encoding="utf-8", newline="") as fh:
        return list(csv.DictReader(fh))


def validate(data: list[dict]) -> bool:
    ok = True

    p = Problems()
    ids = [r.get("id") for r in data]
    dupes = sorted({i for i in ids if ids.count(i) > 1})
    if dupes:
        p.add(f"duplicate credential ids: {dupes}")
    for r in data:
        missing = REQUIRED_FIELDS - set(r)
        if missing:
            p.add(f"{r.get('id', '<no id>')}: missing fields {sorted(missing)}")
        if r.get("status") not in VALID_STATUSES:
            p.add(f"{r.get('id')}: invalid status {r.get('status')!r}")
        if r.get("type") not in VALID_TYPES:
            p.add(f"{r.get('id')}: invalid type {r.get('type')!r}")
        if not str(r.get("direct_url", "")).startswith("https://"):
            p.add(f"{r.get('id')}: direct_url is not https")
        if not COURSE_URL.match(str(r.get("direct_url", ""))):
            p.add(f"{r.get('id')}: direct_url is not a Coursera accomplishments URL")
    ok &= p.report(f"canonical dataset structure ({len(data)} records)")

    m = compute(data)

    p = Problems()
    if m["component_ids_not_in_courses"]:
        p.add(f"component ids with no matching course record: {m['component_ids_not_in_courses']}")
    if m["publicly_verified"] + m["account_scoped"] != m["total"]:
        p.add("status counts do not sum to the total")
    if sum(m["categories"].values()) != m["total"]:
        p.add("category totals do not sum to the total")
    ok &= p.report("internal consistency")

    p = Problems()
    for key in ("total", "publicly_verified", "account_scoped",
                "specializations_and_professional_certificates", "courses",
                "standalone_courses", "component_courses", "shared_component_entries"):
        if m[key] != BASELINE[key]:
            p.add(f"{key}: expected {BASELINE[key]}, found {m[key]}")
    ok &= p.report("expected baseline")

    rows = read_csv()
    p = Problems()
    if len(rows) != len(data):
        p.add(f"CSV has {len(rows)} rows, JSON has {len(data)} records")
    else:
        for j, r in zip(data, rows):
            checks = {
                "number": str(j.get("number", "")),
                "title": j["title"],
                "institution": j["institution"],
                "completion_date": j["date"],
                "credential_type": j["type"],
                "credential_id": j["id"],
                "direct_verification_url": j["direct_url"],
                "public_share_url": j.get("share_url", ""),
                "verification_status": j["status"],
                "subject_category": j["category"],
            }
            for col, want in checks.items():
                if (r.get(col) or "") != (want or ""):
                    p.add(f"{j['id']}: CSV column {col} is stale")
                    break
    ok &= p.report("CSV parity with JSON")

    p = Problems()
    app = APP_PATH.read_text(encoding="utf-8")
    if "const credentialsData = [" in app or re.search(r'"direct_url"\s*:', app):
        p.add("app.js still embeds credential data (single-source rule violated)")
    if "credentials_master.json" not in app:
        p.add("app.js does not reference credentials_master.json")
    ok &= p.report("app.js has no embedded dataset")

    print("\n  summary")
    print(f"    total ................. {m['total']}")
    print(f"    publicly verified ..... {m['publicly_verified']}")
    print(f"    account-scoped ........ {m['account_scoped']}")
    print(f"    specializations/certs . {m['specializations_and_professional_certificates']}")
    print(f"    courses ............... {m['courses']} "
          f"({m['standalone_courses']} standalone + {m['component_courses']} component, "
          f"{m['shared_component_entries']} shared entries)")
    print("    categories:")
    for name in sorted(m["categories"]):
        print(f"      {name}: {m['categories'][name]}")
    return ok


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--write", action="store_true",
                    help="regenerate credentials_master.csv from the JSON")
    ap.add_argument("--allow-change", action="store_true",
                    help="accept a different record count than the recorded baseline")
    args = ap.parse_args()

    data = load_json()
    if args.write:
        write_csv(data)
        print(f"wrote {CSV_PATH.name} from {JSON_PATH.name} ({len(data)} records)")

    ok = validate(data)

    if not ok and args.allow_change:
        m = compute(data)
        print("\n  --allow-change: baseline drift acknowledged")
        print(f"    new total: {m['total']} "
              f"(public {m['publicly_verified']} / scoped {m['account_scoped']})")
        print("    update BASELINE in this script and commit it with the data change")
        return 0

    if ok:
        print("\nRESULT: PASS")
        return 0
    print("\nRESULT: FAIL")
    return 1


if __name__ == "__main__":
    sys.exit(main())
