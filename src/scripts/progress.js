const inp = document.getElementById('pg-filter');
const list = document.getElementById('sc-pg-list');

if (inp && list) {
  inp.addEventListener('input', function() {
    const q = inp.value.trim().toLowerCase();
    list.querySelectorAll('.sc-pg-card').forEach(function(card) {
      const link = card.querySelector('.sc-pg-name');
      const title = link ? link.textContent.trim().toLowerCase() : '';
      const aliases = card.dataset.aliases ? card.dataset.aliases.toLowerCase().split('|') : [];
      const matches = !q || title.indexOf(q) !== -1 || aliases.some(function(a) { return a.indexOf(q) !== -1; });
      card.style.display = matches ? '' : 'none';
    });
  });
}
