const repo: string = "https://github.com/Adam-Elmi/SomCheat";

function toTitleCase(str: string): string {
  return str
    .replace(/[-_]/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

document.addEventListener("DOMContentLoaded", () => {
  const messageContainer: HTMLElement | null = document.getElementById("cheatsheet-message");
  const pathname: string = window.location.pathname;

  if (messageContainer && pathname.includes("/cheatsheets/")) {
    const key: string = decodeURIComponent(pathname.split("/").pop() || "")
    const cheatName: string = key ? toTitleCase(key) : "Unknown";

    if (cheatName !== "Unknown" && cheatName.trim() !== "") {
      messageContainer.innerHTML = `
        <p class="dark:text-slate-500">Cheatsheet "<strong class="text-pink-400">${cheatName}</strong>" not found.
        <a href=${repo} target="_blank" class="text-blue-500 underline">Contribute</a> or
        <a href=${repo}/issues target="_blank" class="text-blue-500 underline">Request</a>.</p>
        `;
    } else {
      (messageContainer as HTMLElement).style.display = "none";
    }
  }
  else {
    if (messageContainer) {
      (messageContainer as HTMLElement).style.display = "none";
    }
  }
});
