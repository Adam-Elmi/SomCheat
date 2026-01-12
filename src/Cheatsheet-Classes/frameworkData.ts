import { FrameworkData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/* 
  ------------------
  Frameworks
  ------------------
*/
const all = getAllCheatsheets();

const frameworkData: CheatsheetType[] = all
  .filter(c => c.category === "Framework")
  .map(c => new FrameworkData(c.id, c.title, "Unknown", undefined, c.lastModified));

export default frameworkData;