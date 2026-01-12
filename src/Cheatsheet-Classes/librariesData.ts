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
  .filter(c => c.category === "Library")
  .map(c => new LibraryData(c.id, c.title, "Unknown", undefined, c.lastModified));

export default librariesData;