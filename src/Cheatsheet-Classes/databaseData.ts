import { DatabaseData } from "./classData";
import type CheatsheetType from "../types/cheatsheet";
/* 
  ------------------
  Databases Data
  ------------------
*/
const databasesData: CheatsheetType[] = [
  new DatabaseData("mysql", "MySQL", "Feb 27, 2025"),
  new DatabaseData("postgresql", "PostgreSQL", "Feb 27, 2025"),
  new DatabaseData("sqlite", "SQLite", "Feb 27, 2025"),
  new DatabaseData("mongodb", "MongoDB", "Feb 27, 2025"),
  new DatabaseData("redis", "_", "Feb 27, 2025"),
  new DatabaseData("firestore", "_", "Feb 27, 2025"),
];

export default databasesData;