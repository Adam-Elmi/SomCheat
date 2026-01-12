import { DevToolsData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/* 
  ------------------
  Dev tools Data
  ------------------
*/
const all = getAllCheatsheets();

const devToolsData: CheatsheetType[] = all
  .filter(c => c.category === "DevTools")
  .map(c => new DevToolsData(c.id, c.title, "Unknown", undefined, c.lastModified));

export default devToolsData;