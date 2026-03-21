import { RuntimeData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/* 
  ------------------
  Runtimes Data
  ------------------
*/
const all = getAllCheatsheets();

const runtimeData: CheatsheetType[] = all
  .filter(c => c.category === "Runtimes")
  .map(c => new RuntimeData(c.id, c.title, c.category, c.lastModified || "Unknown", undefined));

export default runtimeData;