import { LanguageData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/* 
------------------
Languages Data
------------------
*/
const all = getAllCheatsheets();

const languagesData: CheatsheetType[] = all
  .filter(c => c.category === "Languages")
  .map(c => new LanguageData(c.id, c.title, c.category, c.lastModified || "Unknown", undefined));

export default languagesData;