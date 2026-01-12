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
  .filter(c => c.category === "Platform")
  .map(c => new PlatformData(c.id, c.title, "Unknown", undefined, c.lastModified));

export default platformsData;