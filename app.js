// Canonical credential dataset: credentials_master.json (single source of truth).
// This file intentionally contains no credential data; it is fetched at runtime.
let credentialsData = [];

// DOM references
const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');
const institutionFilter = document.getElementById('institutionFilter');
const categoryFilter = document.getElementById('categoryFilter');
const typeFilter = document.getElementById('typeFilter');
const resultsCount = document.getElementById('resultsCount');
const resetBtn = document.getElementById('resetBtn');
const verificationFilter = document.getElementById('verificationFilter');
const summaryTotal = document.getElementById('summaryTotal');
const summaryPublic = document.getElementById('summaryPublic');
const summaryScoped = document.getElementById('summaryScoped');
const summaryCourses = document.getElementById('summaryCourses');

// Visual + accessible status badge. Text label always present (never colour alone).
function statusBadge(c) {
  const isPublic = c.status === 'VERIFIED';
  const label = isPublic ? 'PUBLICLY VERIFIED' : 'ACCOUNT-SCOPED';
  const desc = isPublic
    ? 'Recipient and credential title are visible on the public Coursera verification page without signing in.'
    : 'Coursera page requires an account sign-in to confirm the recipient and credential title.';
  const icon = isPublic
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
    : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v5"></path><path d="M12 16h.01"></path></svg>';
  return `<span class="badge ${isPublic ? 'badge-verified' : 'badge-scoped'}" title="${escapeHtml(desc)}">` +
    icon + label + `<span class="sr-only"> — ${escapeHtml(desc)}</span></span>`;
}

// Keep the filter labels' counts in sync with the dataset.
function updateFilterLabels(items) {
  const distinct = (fn) => new Set(items.map(fn)).size;
  const setFirst = (el, text) => { if (el && el.options && el.options.length) el.options[0].textContent = text; };
  setFirst(institutionFilter, 'All Institutions (' + distinct(c => c.institution) + ')');
  setFirst(categoryFilter, 'All Domains (' + distinct(c => c.category) + ')');
  setFirst(typeFilter, 'All Types (' + distinct(c => c.type) + ')');
  setFirst(verificationFilter, 'All Statuses (' + items.length + ')');
}

// Summary counters derived from the canonical dataset (never hard-coded).
function renderSummary(items) {
  const total = items.length;
  const pub = items.filter(c => c.status === 'VERIFIED').length;
  const scoped = items.filter(c => c.status === 'ACCOUNT-SCOPED').length;
  if (summaryTotal) summaryTotal.textContent = String(total);
  if (summaryPublic) summaryPublic.textContent = String(pub);
  if (summaryScoped) summaryScoped.textContent = String(scoped);
  if (summaryCourses) summaryCourses.textContent = String(items.filter(c => c.type === 'Course').length);
  updateFilterLabels(items);
}

function renderCards(items) {
  if (items.length === 0) {
    cardsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No matching credentials found</h3>
        <p>Try adjusting your search keywords or resetting your filters.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    resultsCount.textContent = 'Showing 0 credentials';
    return;
  }

  resultsCount.textContent = `Showing ${items.length} of ${credentialsData.length} credentials`;

  cardsContainer.innerHTML = items.map(c => {
    const isSpec = c.type === 'Specialization' || c.type === 'Professional Certificate';
    const hasComponents = c.component_courses && c.component_courses.length > 0;
    
    // Category pill class
    const categorySlug = c.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const institutionSlug = c.institution.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return `
      <article class="credential-card ${isSpec ? 'card-specialization' : 'card-course'}" data-id="${escapeHtml(c.id)}">
        <div class="card-header">
          <div class="badges-row">
            <span class="badge badge-type badge-${escapeHtml(c.type.toLowerCase().replace(/\s+/g, '-'))}">${escapeHtml(c.type)}</span>
${statusBadge(c)}
            <span class="credential-seq">#${escapeHtml(String(c.number))}</span>
          </div>
          <h3 class="credential-title">${escapeHtml(c.title)}</h3>
          <div class="credential-meta">
            <span class="institution-tag inst-${institutionSlug}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/></svg>
              ${escapeHtml(c.institution)}
            </span>
            <span class="completion-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${escapeHtml(c.date)}
            </span>
          </div>
        </div>

        <div class="card-body">
          <div class="category-pill cat-${categorySlug}">
            ${escapeHtml(c.category)}
          </div>
          
          <div class="credential-id-box">
            <span class="id-label">Credential ID:</span>
            <code class="id-code">${escapeHtml(c.id)}</code>
            <button class="btn-copy-id" data-copy-id="${escapeHtml(c.id)}" title="Copy ID">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>

          ${c.status === 'ACCOUNT-SCOPED' ? `<p class="status-note">Coursera requires an account sign-in to confirm the recipient and title for this certificate.</p>` : ''}
          ${c.parent_specialization ? `
            <div class="parent-spec-notice">
              <span>Part of:</span> <strong>${escapeHtml(c.parent_specialization)}</strong>
            </div>
          ` : ''}

          ${hasComponents ? `
            <div class="components-accordion">
              <button class="btn-accordion-toggle" onclick="toggleComponents(this)">
                <span>Includes ${c.component_courses.length} Component Courses</span>
                <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="components-panel" style="display: none;">
                <ul class="components-list">
                  ${c.component_courses.map(cc => `
                    <li>
                      <span class="comp-title">${escapeHtml(cc.title)}</span>
                      <a href="${safeUrl(cc.url)}" target="_blank" rel="noopener noreferrer" class="comp-verify-link">
                        Verify [${escapeHtml(cc.id)}] ↗
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          ` : ''}
        </div>

        <div class="card-footer">
          <a href="${safeUrl(c.direct_url)}" target="_blank" rel="noopener noreferrer" class="btn btn-verify">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            VIEW ON COURSERA
          </a>
          ${c.share_url ? `
            <a href="${safeUrl(c.share_url)}" target="_blank" rel="noopener noreferrer" class="btn btn-share" title="Public Coursera Share Link">
              Share Link ↗
            </a>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');
}

function filterCredentials() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedInst = institutionFilter.value;
  const selectedCat = categoryFilter.value;
  const selectedType = typeFilter.value;
  const selectedVerification = verificationFilter ? verificationFilter.value : '';

  const filtered = credentialsData.filter(c => {
    // Search match
    const titleMatch = c.title.toLowerCase().includes(query);
    const idMatch = c.id.toLowerCase().includes(query);
    const instMatch = c.institution.toLowerCase().includes(query);
    const catMatch = c.category.toLowerCase().includes(query);
    const searchPass = !query || titleMatch || idMatch || instMatch || catMatch;

    // Institution filter
    const instPass = !selectedInst || c.institution === selectedInst;

    // Category filter
    const catPass = !selectedCat || c.category === selectedCat;

    // Type filter
    const typePass = !selectedType || c.type === selectedType;

    // Verification filter: 'public' | 'scoped' | '' (all)
    const verificationPass = !selectedVerification ||
      (selectedVerification === 'public' && c.status === 'VERIFIED') ||
      (selectedVerification === 'scoped' && c.status === 'ACCOUNT-SCOPED');

    return searchPass && instPass && catPass && typePass && verificationPass;
  });

  renderCards(filtered);
}

function resetFilters() {
  searchInput.value = '';
  institutionFilter.value = '';
  categoryFilter.value = '';
  typeFilter.value = '';
  if (verificationFilter) verificationFilter.value = '';
  renderCards(credentialsData);
}

function toggleComponents(btn) {
  const panel = btn.nextElementSibling;
  const chevron = btn.querySelector('.chevron');
  if (panel.style.display === 'none' || !panel.style.display) {
    panel.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
  } else {
    panel.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
  }
}

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = `<span style="color:#10b981;font-size:11px;font-weight:bold;">Copied!</span>`;
    setTimeout(() => {
      btn.innerHTML = original;
    }, 1500);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

// Only allow https links to Coursera hosts into href attributes.
function safeUrl(url) {
  if (!url) return '#';
  try {
    const parsed = new URL(url, window.location.href);
    const allowedHosts = ['coursera.org', 'www.coursera.org'];
    if (parsed.protocol === 'https:' && allowedHosts.indexOf(parsed.hostname) !== -1) {
      return escapeHtml(parsed.href);
    }
  } catch (e) {
    // fall through to the inert placeholder
  }
  return '#';
}

// Event Listeners
searchInput.addEventListener('input', filterCredentials);
institutionFilter.addEventListener('change', filterCredentials);
categoryFilter.addEventListener('change', filterCredentials);
typeFilter.addEventListener('change', filterCredentials);
if (verificationFilter) verificationFilter.addEventListener('change', filterCredentials);
resetBtn.addEventListener('click', resetFilters);
// Delegated handler for the per-card "Copy ID" button (no inline JS in markup).
cardsContainer.addEventListener('click', function (event) {
  const btn = event.target.closest('[data-copy-id]');
  if (!btn) return;
  copyToClipboard(btn.getAttribute('data-copy-id'), btn);
});

// Quick Category Filter Buttons
document.querySelectorAll('.cat-quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.getAttribute('data-cat');
    categoryFilter.value = cat;
    filterCredentials();
    document.getElementById('credentialsSection').scrollIntoView({ behavior: 'smooth' });
  });
});

// Initial load: fetch the canonical dataset, then render.
async function loadCredentials() {
  const response = await fetch('credentials_master.json', { cache: 'no-cache' });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) throw new Error('dataset empty');
  return data;
}

document.addEventListener('DOMContentLoaded', async () => {
  cardsContainer.innerHTML = '<p class="loading-note">Loading credentials…</p>';
  try {
    credentialsData = await loadCredentials();
    renderSummary(credentialsData);
    renderCards(credentialsData);
  } catch (err) {
    cardsContainer.innerHTML = '<p class="error-note">Could not load credentials_master.json. ' +
      'Serve this folder over HTTP (e.g. <code>python -m http.server 8000</code>) and reload.</p>';
    if (window.console) console.error('Credential dataset load failed:', err);
  }
});
