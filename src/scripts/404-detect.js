const CATEGORIES = ["languages", "databases", "frameworks", "libraries", "platforms", "devtools", "runtimes", "other"];
const REPO = "https://github.com/Adam-Elmi/SomCheat";

const parts = window.location.pathname.replace(/\/$/, "").split("/").filter(Boolean);
let cheatsheetSlug = null;
let categorySlug = null;

if (parts[0] === "cheatsheet") {
  if (parts.length === 2) {
    cheatsheetSlug = parts[1];
  } else if (parts.length >= 3 && CATEGORIES.includes(parts[1])) {
    categorySlug = parts[1];
    cheatsheetSlug = parts[2];
  }
}

function formatSlug(s) {
  return s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

if (cheatsheetSlug) {
  const displayName = formatSlug(cheatsheetSlug);
  document.getElementById("sc-404-cs-name").textContent = `"${displayName}"`;

  const issueTitle = `[Cheatsheet Request] ${displayName}`;
  const body = [
    "## Cheatsheet Request",
    "",
    `**Name:** ${displayName}`,
    categorySlug ? `**Category:** ${formatSlug(categorySlug)}` : null,
    `**Path:** \`${window.location.pathname}\``,
    "",
    "<!-- Add any extra context, links, or references for this cheatsheet -->",
  ].filter(Boolean).join("\n");

  document.getElementById("sc-404-request-btn").href =
    `${REPO}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(body)}&labels=cheatsheet-request`;

  document.getElementById("sc-404-general").setAttribute("hidden", "");
  document.getElementById("sc-404-cheatsheet").removeAttribute("hidden");
}
