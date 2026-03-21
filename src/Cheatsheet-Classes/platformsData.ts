import { PlatformData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/* 
  ------------------
  Platforms Data
  ------------------
*/
const all = getAllCheatsheets();

const platformsData: CheatsheetType[] = all
  .filter(c => c.category === "Platforms")
  .map(c => new PlatformData(c.id, c.title, c.category, c.lastModified || "Unknown", undefined));

export default platformsData;