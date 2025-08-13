import computerData from "../../Cheatsheet-Classes/computerData.ts";
import languagesData from "../../Cheatsheet-Classes/languageData.ts";
import databasesData from "../../Cheatsheet-Classes/databaseData.ts";
import frameworkData from "../../Cheatsheet-Classes/frameworkData.ts";
import librariesData from "../../Cheatsheet-Classes/librariesData.ts";
import platformsData from "../../Cheatsheet-Classes/platformsData.ts";
import runtimeData from "../../Cheatsheet-Classes/runtimeData.ts";
import devToolsData from "../../Cheatsheet-Classes/devToolsData.ts";
import { Category } from "../../Cheatsheet-Classes/classData.ts";

import {
  CubesIcon,
  DatabaseIcon,
  LibraryIcon,
  OSIcon,
  DevToolsIcon,
  CodeIcon,
  RuntimeIcon,
  ComputerIcon
} from "../icons/Categories_Icons";

const dataList = [
  new Category("comp", "Basics", computerData, <ComputerIcon dimension={40} color="#777" />, computerData.length),
  new Category("langs", "Languages", languagesData, <CodeIcon dimension={40} color="#6364f1" />, languagesData.length),
  new Category("dbs", "Databases", databasesData, <DatabaseIcon dimension={40} color="#fba8a8" />, databasesData.length),
  new Category("frame", "Frameworks", frameworkData, <CubesIcon dimension={40} color="#fecb66" />, frameworkData.length),
  new Category("lib", "Libraries", librariesData, <LibraryIcon dimension={35} color="#caf"/>, librariesData.length),
  new Category("os", "Platforms", platformsData, <OSIcon dimension={45} color="#1aa5e7" />, platformsData.length),
  new Category("run", "runtimes", runtimeData, <RuntimeIcon dimension={40} color="#acd"/>, runtimeData.length),
  new Category("dev", "Dev Tools", devToolsData, <DevToolsIcon dimension={40} color="#aea" />, devToolsData.length),
];

export default dataList;
