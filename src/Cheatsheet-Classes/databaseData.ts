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
  .filter(c => c.category === "Database")
  .map(c => new DatabaseData(c.id, c.title, c.lastModified || "Unknown", undefined));

export default databasesData;