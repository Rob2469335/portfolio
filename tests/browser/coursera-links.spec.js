// Live Coursera link checks.
// These exercise the real public pages: reachability for all 42 links, and full
// anonymous rendering for the six specialization certificates (fresh context,
// no cookies, no sign-in).
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'credentials_master.json'), 'utf8'));
const SPECIALIZATION_IDS = ['CT190TJLYPT7', 'DA024S7Y1GKH', 'NC3UJ0LDPVND', '46TOQXSQP79M', 'VC6X0HJ0ZKVP', 'Y54CWPZ5JJ4Q'];

// A generous timeout: these hit the live web.
test.setTimeout(180_000);

test.describe('coursera public verification', () => {
  test('all 42 links resolve', async ({ request }) => {
    const failures = [];
    for (const c of DATA) {
      const res = await request.get(c.direct_url, { maxRedirects: 10, timeout: 45_000 }).catch((e) => ({ status: () => 0, _err: String(e) }));
      const status = res.status();
      if (status !== 200) failures.push(`${c.id} -> ${status}`);
    }
    expect(failures).toEqual([]);
  });

  test('dataset uses only supported verification URL forms', async () => {
    const allowed = [
      /^https:\/\/(www\.)?coursera\.org\/account\/accomplishments\/verify\/[A-Za-z0-9]+$/,
      /^https:\/\/(www\.)?coursera\.org\/account\/accomplishments\/specialization\/[A-Za-z0-9]+$/,
      /^https:\/\/coursera\.org\/verify\/specialization\/[A-Za-z0-9]+$/,
    ];
    const bad = DATA.filter((c) => !allowed.some((re) => re.test(c.direct_url))).map((c) => `${c.id}: ${c.direct_url}`);
    expect(bad).toEqual([]);
    // The broken legacy form must not return.
    const legacy = DATA.filter((c) => c.direct_url.includes('/specialization/certificate/')).map((c) => c.id);
    expect(legacy).toEqual([]);
  });

  for (const id of SPECIALIZATION_IDS) {
    test(`specialization ${id} renders recipient and title when logged out`, async ({ browser }) => {
      const record = DATA.find((c) => c.id === id);
      const ctx = await browser.newContext({ locale: 'en-US' }); // fresh => logged out
      const page = await ctx.newPage();
      await page.goto(record.direct_url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
      await page.waitForLoadState('networkidle', { timeout: 25_000 }).catch(() => {});
      await page.waitForTimeout(1200);

      const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' '));
      const cookies = await ctx.cookies();

      expect(page.url()).toContain('/account/accomplishments/specialization/' + id);
      expect(text).toMatch(/Completed by Robert locust/i);
      expect(text).toMatch(/Log In|Join for Free/);           // confirms anonymous view
      expect(cookies.some((c) => /^(CAUTH|CAUTH2|session)$/i.test(c.name))).toBe(false);
      expect(text.toLowerCase()).toContain(
        record.title.replace(/ (Specialization|Professional Certificate)$/, '').toLowerCase().slice(0, 18));

      await ctx.close();
    });
  }

  test('negative control: an invalid id renders no recipient', async ({ browser }) => {
    const ctx = await browser.newContext({ locale: 'en-US' });
    const page = await ctx.newPage();
    await page.goto('https://coursera.org/verify/specialization/ZZZZ0000ZZZZ',
      { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForLoadState('networkidle', { timeout: 25_000 }).catch(() => {});
    await page.waitForTimeout(1200);
    const text = await page.evaluate(() => document.body.innerText);
    expect(/Robert\s+locust/i.test(text)).toBe(false);
    expect(/Completed by/i.test(text)).toBe(false);
    await ctx.close();
  });
});
