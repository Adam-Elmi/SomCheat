(function () {
  // ── Theme toggle ──────────────────────────────────────────────────────
  var themeBtn = document.getElementById('ck-theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme-value', next);
    });
  }

  // ── Heading IDs ───────────────────────────────────────────────────────
  function slugify(text) {
    return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }

  var content = document.querySelector('.ck-content');
  if (content) {
    content.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function (h) {
      if (!h.id) h.id = slugify(h.textContent.trim());
    });
  }

  // ── Sidenav: mobile modal ─────────────────────────────────────────────
  var navBtn = document.getElementById('ck-nav-btn');
  var navBackdrop = document.getElementById('ck-nav-backdrop');
  var navClose = document.getElementById('ck-nav-close');

  function openNav() { body.classList.add('nav-open'); }
  function closeNav() { body.classList.remove('nav-open'); }

  if (navBtn) navBtn.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeNav);

  var sidenav = document.querySelector('.ck-sidenav');
  if (sidenav) {
    sidenav.querySelectorAll('.ck-sidenav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 1024) closeNav();
      });
    });
  }

  // ── Sidenav: search filter ────────────────────────────────────────────
  var navSearch = document.getElementById('ck-nav-search');
  if (navSearch && sidenav) {
    navSearch.addEventListener('input', function () {
      var q = this.value.trim().toLowerCase();
      sidenav.querySelectorAll('.ck-sidenav-group').forEach(function (group) {
        var anyVisible = false;
        group.querySelectorAll('.ck-sidenav-link').forEach(function (link) {
          var name = (link.querySelector('.ck-sidenav-name') || link).textContent.trim().toLowerCase();
          var aliases = (link.dataset.aliases || '').toLowerCase();
          var show = !q || name.includes(q) || aliases.split(',').some(function (a) { return a.trim().includes(q); });
          link.style.display = show ? '' : 'none';
          if (show) anyVisible = true;
        });
        group.style.display = anyVisible ? '' : 'none';
      });
    });
  }

  // ── TOC: mobile drawer ────────────────────────────────────────────────
  var body = document.body;
  var toc = document.getElementById('ck-toc');
  var backdrop = document.getElementById('ck-toc-backdrop');
  var openBtn = document.getElementById('ck-contents-btn');
  var closeBtn = document.getElementById('ck-toc-close');

  function openToc() { body.classList.add('toc-open'); }
  function closeToc() { body.classList.remove('toc-open'); }

  if (openBtn) openBtn.addEventListener('click', openToc);
  if (closeBtn) closeBtn.addEventListener('click', closeToc);
  if (backdrop) backdrop.addEventListener('click', closeToc);

  // close on link click (mobile)
  if (toc) {
    toc.querySelectorAll('.ck-tl').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 1100) closeToc();
      });
    });
  }

  // ── TOC: active heading on scroll ────────────────────────────────────
  var tocLinks = toc ? Array.from(toc.querySelectorAll('.ck-tl[data-id]')) : [];

  if (tocLinks.length && content) {
    var headingEls = Array.from(
      content.querySelectorAll('h1[id], h2[id], h3[id], h4[id]')
    );
    var activeId = null;

    function updateActive() {
      tocLinks.forEach(function (link) {
        var isActive = link.dataset.id === activeId;
        link.classList.toggle('is-active', isActive);
        if (isActive) scrollLinkIntoView(link);
      });
    }

    function scrollLinkIntoView(link) {
      if (!toc) return;
      var linkTop = link.offsetTop;
      var tocScrollTop = toc.scrollTop;
      var tocHeight = toc.clientHeight;
      if (linkTop < tocScrollTop || linkTop > tocScrollTop + tocHeight - 48) {
        toc.scrollTop = linkTop - tocHeight / 2;
      }
    }

    function setupObserver() {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) activeId = entry.target.id;
          });
          updateActive();
        },
        { rootMargin: '-' + (52 + 16) + 'px 0px -70% 0px', threshold: 0 }
      );
      headingEls.forEach(function (h) { observer.observe(h); });
    }

    if (document.readyState === 'complete') {
      setupObserver();
    } else {
      window.addEventListener('load', setupObserver, { once: true });
    }
  }

  // ── Code: copy button ─────────────────────────────────────────────────
  document.querySelectorAll('.ck-code-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.closest('.ck-code').querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.textContent).then(function () {
        btn.dataset.copied = '1';
        setTimeout(function () { delete btn.dataset.copied; }, 2000);
      });
    });
  });
})();
