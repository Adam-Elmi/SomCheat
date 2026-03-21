import { DatabaseData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/* 
  ------------------
  Databases Data
  ------------------
*/
const all = getAllCheatsheets();

const databasesData: CheatsheetType[] = all
  .filter(c => c.category === "Databases")
  .map(c => new DatabaseData(c.id, c.title, c.category, c.lastModified || "Unknown", undefined));

export default databasesData;