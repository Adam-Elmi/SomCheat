import { AdditionalData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/*
  ------------------
  Additional Data
  ------------------
*/
const all = getAllCheatsheets();

const additionalData: CheatsheetType[] = all
  .filter(c => c.category === "Additional" || c.category === "Other")
  .map(c => new AdditionalData(c.id, c.title, "Unknown", undefined, c.lastModified));

export default additionalData;