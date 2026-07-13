{
  const apply = (t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("theme-value", t);
  };
  apply(localStorage.getItem("theme-value") || "light");

  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      apply(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  const menuBtn = document.getElementById("menu-toggle");
  const navlinks = document.getElementById("sc-navlinks");
  if (menuBtn && navlinks) {
    menuBtn.addEventListener("click", () => {
      const open = navlinks.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (e) => {
      if (!menuBtn.contains(e.target) && !navlinks.contains(e.target)) {
        navlinks.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
}
