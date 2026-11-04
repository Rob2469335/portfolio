// Desktop browser tests against the real shipped application.
const { test, expect } = require('@playwright/test');

const EXPECTED = { total: 42, publiclyVerified: 42, accountScoped: 0, courses: 36 };

test.describe('desktop portfolio', () => {
  let consoleErrors;
  let pageErrors;

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    pageErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(String(err)));
    await page.goto('/index.html', { waitUntil: 'networkidle' });
    await expect(page.locator('.credential-card')).toHaveCount(EXPECTED.total);
  });

  test('page loads with dataset fetched from the canonical JSON', async ({ page }) => {
    const res = await page.request.get('/credentials_master.json');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/json');
  });

  test('summary counters are correct', async ({ page }) => {
    await expect(page.locator('#summaryTotal')).toHaveText(String(EXPECTED.total));
    await expect(page.locator('#summaryPublic')).toHaveText(String(EXPECTED.publiclyVerified));
    await expect(page.locator('#summaryScoped')).toHaveText(String(EXPECTED.accountScoped));
    await expect(page.locator('#summaryCourses')).toHaveText(String(EXPECTED.courses));
    await expect(page.locator('#resultsCount')).toHaveText('Showing 42 of 42 credentials');
  });

  test('every credential card carries a public-verification badge', async ({ page }) => {
    await expect(page.locator('.credential-card .badge-verified')).toHaveCount(EXPECTED.publiclyVerified);
    await expect(page.locator('.credential-card .badge-scoped')).toHaveCount(EXPECTED.accountScoped);
    // Text labels exist (not colour alone) and are accessible.
    await expect(page.locator('.credential-card .badge-verified').first()).toContainText('PUBLICLY VERIFIED');
    await expect(page.locator('.credential-card .badge-verified .sr-only').first()).toContainText('without signing in');
    const title = await page.locator('.credential-card .badge-verified').first().getAttribute('title');
    expect(title).toContain('public');
  });

  test('no card carries an account-scoped note', async ({ page }) => {
    await expect(page.locator('.status-note')).toHaveCount(EXPECTED.accountScoped);
  });

  test('search filters the list and updates the counter', async ({ page }) => {
    await page.fill('#searchInput', 'prompt');
    const cards = page.locator('.credential-card');
    const n = await cards.count();
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThan(EXPECTED.total);
    for (let i = 0; i < n; i++) {
      await expect(cards.nth(i)).toContainText(/prompt/i);
    }
    await expect(page.locator('#resultsCount')).toHaveText(`Showing ${n} of 42 credentials`);
  });

  test('institution filter works', async ({ page }) => {
    await page.selectOption('#institutionFilter', 'Google');
    const cards = page.locator('.credential-card');
    const n = await cards.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i++) {
      await expect(cards.nth(i).locator('.institution-tag')).toContainText('Google');
    }
  });

  test('category filter works', async ({ page }) => {
    await page.selectOption('#categoryFilter', 'AI Agents and Agentic Systems');
    await expect(page.locator('.credential-card')).toHaveCount(3);
    const pills = page.locator('.category-pill');
    for (let i = 0; i < 3; i++) {
      await expect(pills.nth(i)).toContainText('AI Agents and Agentic Systems');
    }
  });

  test('credential type filter works', async ({ page }) => {
    await page.selectOption('#typeFilter', 'Course');
    await expect(page.locator('.credential-card')).toHaveCount(36);
    await page.selectOption('#typeFilter', 'Specialization');
    await expect(page.locator('.credential-card')).toHaveCount(5);
    await page.selectOption('#typeFilter', 'Professional Certificate');
    await expect(page.locator('.credential-card')).toHaveCount(1);
  });

  test('verification filter reflects the all-public dataset', async ({ page }) => {
    // No credential is account-scoped, so this filter yields the empty state.
    await page.selectOption('#verificationFilter', 'scoped');
    await expect(page.locator('.credential-card')).toHaveCount(EXPECTED.accountScoped);
    await expect(page.locator('.empty-state')).toBeVisible();

    await page.selectOption('#verificationFilter', 'public');
    await expect(page.locator('.credential-card')).toHaveCount(EXPECTED.publiclyVerified);
    await expect(page.locator('.credential-card .badge-verified')).toHaveCount(EXPECTED.publiclyVerified);
    await expect(page.locator('.credential-card .badge-scoped')).toHaveCount(0);
  });

  test('empty state appears and reset restores the full list', async ({ page }) => {
    await page.fill('#searchInput', 'zzzz-no-such-credential');
    await expect(page.locator('.empty-state')).toBeVisible();
    await expect(page.locator('#resultsCount')).toHaveText('Showing 0 credentials');

    await page.click('#resetBtn');
    await expect(page.locator('.credential-card')).toHaveCount(EXPECTED.total);
    await expect(page.locator('#searchInput')).toHaveValue('');
    await expect(page.locator('#resultsCount')).toHaveText('Showing 42 of 42 credentials');
  });

  test('specialization accordions open and close', async ({ page }) => {
    const toggle = page.locator('.btn-accordion-toggle').first();
    const panel = page.locator('.components-panel').first();
    await expect(toggle).toBeVisible();
    await expect(panel).toBeHidden();
    await toggle.click();
    await expect(panel).toBeVisible();
    await toggle.click();
    await expect(panel).toBeHidden();
  });

  test('copy-ID button copies the credential id', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const btn = page.locator('[data-copy-id]').first();
    const id = await btn.getAttribute('data-copy-id');
    expect(id).toMatch(/^[A-Z0-9]+$/);
    await btn.click();
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toBe(id);
  });

  test('external links point to Coursera and are safe', async ({ page }) => {
    const links = page.locator('a[target="_blank"]');
    const n = await links.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i++) {
      const href = await links.nth(i).getAttribute('href');
      const rel = await links.nth(i).getAttribute('rel');
      expect(href).toMatch(/^(https:\/\/(www\.)?(coursera\.org|github\.com)\/|verification_report\.md$)/);
      expect(rel || '').toContain('noopener');
    }
  });

  test('no uncaught JavaScript errors and no console errors', async ({ page }) => {
    await page.click('#resetBtn');
    await page.fill('#searchInput', 'ai');
    await page.selectOption('#verificationFilter', 'scoped');
    await page.waitForTimeout(300);
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
