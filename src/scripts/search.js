const raw = window.__somcheatIndex;
const index = typeof raw === 'string' ? JSON.parse(raw) : (Array.isArray(raw) ? raw : []);

const input = document.querySelector('.sc-search input');
const btn = document.querySelector('.sc-search-btn');
const results = document.getElementById('sc-search-results');

function navigate() {
  const q = input.value.trim();
  if (!q) return;
  const q_lower = q.toLowerCase();
  const match = index.find(s =>
    s.title.toLowerCase() === q_lower ||
    s.aliases.some(a => a.toLowerCase() === q_lower)
  );
  const slug = q_lower.replace(/\s+/g, '-');
  window.location.href = match ? match.url : `/cheatsheet/other/${slug}`;
}

function render(q) {
  if (!q) { results.hidden = true; results.innerHTML = ''; return; }
  const q_lower = q.toLowerCase();
  const matches = index.filter(s =>
    s.title.toLowerCase().includes(q_lower) ||
    s.aliases.some(a => a.toLowerCase().includes(q_lower))
  );
  if (!matches.length) {
    results.innerHTML = '<p class="sc-no-results">No results found</p>';
    results.hidden = false;
    return;
  }
  results.innerHTML = matches.map(s => `
    <a href="${s.url}" class="sc-result-item">
      <span class="sc-result-icon">${s.iconHtml}</span>
      <span class="sc-result-title">${s.title}</span>
    </a>
  `).join('');
  results.hidden = false;
}

if (input && results) {
  input.addEventListener('input', e => render(e.target.value.trim()));
  btn?.addEventListener('click', navigate);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') navigate(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { results.hidden = true; input.blur(); }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.sc-search-wrapper')) results.hidden = true;
  });
}
