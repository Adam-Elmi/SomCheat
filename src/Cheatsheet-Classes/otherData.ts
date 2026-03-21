import { Other } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/*
  ------------------
  Other Data
  ------------------
*/
const all = getAllCheatsheets();

const otherData: CheatsheetType[] = all
  .filter(c =>  c.category === "Other")
  .map(c => new Other(c.id, c.title, c.category, c.lastModified || "Unknown", undefined));

export default otherData;