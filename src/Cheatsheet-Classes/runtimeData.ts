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
  .filter(c => c.category === "Runtime")
  .map(c => new RuntimeData(c.id, c.title, "Unknown", undefined, c.lastModified));

export default runtimeData;