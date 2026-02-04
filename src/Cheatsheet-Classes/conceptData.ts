import { ConceptData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
import { getAllCheatsheets } from "../data/cheatsheets";

/*
  ------------------
  Concepts Data
  ------------------
*/
const all = getAllCheatsheets();

const conceptData: CheatsheetType[] = all
  .filter(c => c.category === "Concept")
  .map(c => new ConceptData(c.id, c.title, c.lastModified || "Unknown", undefined));

export default conceptData;
