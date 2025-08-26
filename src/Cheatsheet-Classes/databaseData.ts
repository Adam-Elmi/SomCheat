import { Database } from "./classData";
import type CheatsheetType from "../types/cheatsheet";
/* 
  ------------------
  Databases
  ------------------
*/
const databasesData: CheatsheetType[] = [
  new Database("mysql", "MySQL", "Feb 27, 2025"),
  new Database("postgresql", "PostgreSQL", "Feb 27, 2025"),
  new Database("sqlite", "SQLite", "Feb 27, 2025"),
  new Database("mongodb", "MongoDB", "Feb 27, 2025"),
  new Database("redis", "_", "Feb 27, 2025"),
  new Database("firestore", "_", "Feb 27, 2025"),
];

export default databasesData;