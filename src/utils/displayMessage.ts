import pathData from "../../data/path.json";

const repo: string = "https://github.com/Adam-Elmi/SomCheat";
document.addEventListener("DOMContentLoaded", () => {
  const messageContainer: HTMLElement | null = document.getElementById("cheatsheet-message");
  const pathname: string = window.location.pathname;
  console.log(pathname.split("/"));

  if (messageContainer && pathname.includes("/cheatsheets/")) {
    const key: string = decodeURIComponent(pathname.split("/").pop() || "")
    const cheatName: string = pathData.hasOwnProperty(key) ?(pathData as any)[key].name : pathname.split("/").filter(value => value != "")[1];
    messageContainer.innerHTML = `
    <p class="dark:text-slate-500">Cheatsheet "<strong class="text-pink-400">${cheatName}</strong>" not found.
    <a href=${repo} target="_blank" class="text-blue-500 underline">Contribute</a> or
    <a href=${repo}/issues target="_blank" class="text-blue-500 underline">Request</a>.</p>
  `;
  } 
  else {
    (messageContainer as HTMLElement).style.display = "none";
  }
});
