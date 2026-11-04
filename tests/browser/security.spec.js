// Security-oriented browser checks: hostile values must not become markup or
// executable links. Real credential records are never modified; a hostile copy
// is injected at the network layer for the duration of each test.
const { test, expect } = require('@playwright/test');

function hostileRecord(overrides = {}) {
  return {
    number: 1,
    id: 'SAFEID123',
    title: 'Safe Title',
    institution: 'Google',
    type: 'Course',
    date: 'January 2026',
    category: 'Generative AI and Large Language Models',
    direct_url: 'https://www.coursera.org/account/accomplishments/verify/SAFEID123',
    share_url: '',
    status: 'VERIFIED',
    ...overrides,
  };
}

async function withDataset(page, records) {
  await page.route('**/credentials_master.json', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(records),
    }));
  await page.goto('/index.html', { waitUntil: 'networkidle' });
}

test.describe('security', () => {
  test('sanitiser functions reject unsafe input', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'networkidle' });
    const results = await page.evaluate(() => ({
      js: safeUrl('javascript:alert(1)'),
      data: safeUrl('data:text/html,<script>alert(1)</script>'),
      http: safeUrl('http://www.coursera.org/verify/ABC'),
      foreign: safeUrl('https://evil.example/verify/ABC'),
      ok: safeUrl('https://www.coursera.org/verify/ABC'),
      esc: escapeHtml('<img src=x onerror=1>'),
      quotes: escapeHtml('"\''),
    }));
    expect(results.js).toBe('#');
    expect(results.data).toBe('#');
    expect(results.http).toBe('#');
    expect(results.foreign).toBe('#');
    expect(results.ok).toMatch(/^https:\/\/www\.coursera\.org\/verify\/ABC/);
    expect(results.esc).toBe('&lt;img src=x onerror=1&gt;');
    expect(results.quotes).toBe('&quot;&#039;');
  });

  test('hostile credential fields cannot create markup', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));

    await withDataset(page, [
      hostileRecord({
        id: '"><script>window.__xss=1</script>',
        title: '<img src=x onerror="window.__xss=2">',
        institution: '<svg onload="window.__xss=3">Google</svg>',
        category: '<script>window.__xss=4</script>',
        direct_url: 'javascript:window.__xss=5',
      }),
    ]);
    await expect(page.locator('.credential-card')).toHaveCount(1);

    const state = await page.evaluate(() => ({
      xss: window.__xss,
      imgs: document.querySelectorAll('img[src="x"]').length,
      svgs: document.querySelectorAll('.institution-tag svg[onload]').length,
      scripts: document.querySelectorAll('.credential-card script').length,
      href: document.querySelector('.credential-card a.btn-verify').getAttribute('href'),
      titleText: document.querySelector('.credential-title').textContent,
    }));

    expect(state.xss).toBeUndefined();
    expect(state.imgs).toBe(0);
    expect(state.svgs).toBe(0);
    expect(state.scripts).toBe(0);
    expect(state.href).toBe('#');
    expect(state.titleText).toContain('<img src=x');
    expect(pageErrors).toEqual([]);
  });

  test('search input cannot inject markup', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'networkidle' });
    const payload = '<img src=x onerror="window.__xssSearch=1">';
    await page.fill('#searchInput', payload);
    await page.waitForTimeout(200);
    const state = await page.evaluate(() => ({
      xss: window.__xssSearch,
      imgs: document.querySelectorAll('img[src="x"]').length,
    }));
    expect(state.xss).toBeUndefined();
    expect(state.imgs).toBe(0);
    await expect(page.locator('.empty-state')).toBeVisible();
  });

  test('all rendered links are https and carry rel=noopener', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'networkidle' });
    const bad = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.credential-card a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (!/^https:\/\/(www\.)?coursera\.org\//.test(href)) out.push('href:' + href);
        if (!(a.getAttribute('rel') || '').includes('noopener')) out.push('rel:' + href);
      });
      return out;
    });
    expect(bad).toEqual([]);
  });
});
