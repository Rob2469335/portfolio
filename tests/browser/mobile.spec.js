// Mobile-viewport tests (Pixel 7 profile) against the real application.
const { test, expect } = require('@playwright/test');

test.describe('mobile portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'networkidle' });
    await expect(page.locator('.credential-card')).toHaveCount(42);
  });

  test('no horizontal page overflow', async ({ page }) => {
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      bodyScrollWidth: document.body.scrollWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);
    expect(overflow.bodyScrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);
  });

  test('cards and badges remain visible and readable', async ({ page }) => {
    const card = page.locator('.credential-card').first();
    await expect(card).toBeVisible();
    const box = await card.boundingBox();
    expect(box.width).toBeGreaterThan(240);
    await expect(card.locator('.credential-title')).toBeVisible();
    await expect(page.locator('.badge-verified').first()).toBeVisible();
    await expect(page.locator('.badge-scoped').first()).toBeVisible();
    await expect(page.locator('#summaryTotal')).toBeVisible();
  });

  test('search and filters remain usable', async ({ page }) => {
    await page.fill('#searchInput', 'generative');
    await expect(page.locator('#resultsCount')).not.toHaveText('Showing 42 of 42 credentials');
    await page.fill('#searchInput', '');

    await page.selectOption('#institutionFilter', 'Google');
    const n = await page.locator('.credential-card').count();
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThan(42);

    await page.selectOption('#institutionFilter', '');
    await page.selectOption('#verificationFilter', 'scoped');
    await expect(page.locator('.credential-card')).toHaveCount(6);
  });

  test('accordions work on touch', async ({ page }) => {
    const toggle = page.locator('.btn-accordion-toggle').first();
    const panel = page.locator('.components-panel').first();
    await toggle.tap();
    await expect(panel).toBeVisible();
    await toggle.tap();
    await expect(panel).toBeHidden();
  });

  test('interactive controls meet a minimal touch target', async ({ page }) => {
    const targets = ['#resetBtn', '.btn-accordion-toggle', '.btn-copy-id'];
    for (const sel of targets) {
      const el = page.locator(sel).first();
      if (await el.count() === 0) continue;
      const box = await el.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(24);
      expect(box.width).toBeGreaterThanOrEqual(24);
    }
    const input = await page.locator('#searchInput').boundingBox();
    expect(input.height).toBeGreaterThanOrEqual(32);
  });

  test('no clipped text in the summary strip', async ({ page }) => {
    const clipped = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll('.stat-number, .stat-label, .legend-text').forEach((el) => {
        if (el.scrollWidth > el.clientWidth + 2) bad.push(el.className + ':' + el.textContent.trim());
      });
      return bad;
    });
    expect(clipped).toEqual([]);
  });
});
