import { LibraryData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/* 
  ------------------
  Libraries Data
  ------------------
*/
const all = getAllCheatsheets();

const librariesData: CheatsheetType[] = all
  .filter(c => c.category === "Libraries")
  .map(c => new LibraryData(c.id, c.title, c.category, c.lastModified || "Unknown", undefined));

export default librariesData;