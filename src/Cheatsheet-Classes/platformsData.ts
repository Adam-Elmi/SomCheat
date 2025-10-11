import { PlatformData } from "./cheatsheetData";
import type CheatsheetType from "../types/cheatsheet";
/* 
  ------------------
  Platforms Data
  ------------------
*/
const platformsData: CheatsheetType[] = [
  new PlatformData("linux", "_", "Feb 27, 2025"),
  new PlatformData("windows", "_", "Feb 27, 2025"),
  new PlatformData("macos", "MacOS", "Feb 27, 2025"),
  new PlatformData("ubuntu", "_", "Feb 27, 2025"),
  new PlatformData("nixos", "NixOS", "Feb 27, 2025"),
];

export default platformsData;