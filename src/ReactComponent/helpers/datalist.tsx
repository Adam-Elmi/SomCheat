import computerData from "./computerData";
import languagesData from "./languageData";
import databasesData from "./databaseData";
import frameworkData from "./frameworkData";
import librariesData from "./librariesData";
import platformsData from "./platformsData";
import runtimeData from "./runtimeData";
import devToolsData from "./devToolsData";

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
  {
    id: "comp",
    _name: "Basics",
    data: computerData,
    icon: <ComputerIcon dimension={40} color="#777" />,
    number_of_cheatsheets: computerData.length,
  },
  {
    id: "langs",
    _name: "Languages",
    data: languagesData,
    icon: <CodeIcon dimension={40} color="#6364f1" />,
    number_of_cheatsheets: languagesData.length,
  },
  {
    id: "dbs",
    _name: "Databases",
    data: databasesData,
    icon: <DatabaseIcon dimension={40} color="#fba8a8" />,
    number_of_cheatsheets: databasesData.length,
  },
  {
    id: "frame",
    _name: "Frameworks",
    data: frameworkData,
    icon: <CubesIcon dimension={40} color="#fecb66" />,
    number_of_cheatsheets: frameworkData.length,
  },
  {
    id: "lib",
    _name: "Libraries",
    data: librariesData,
    icon: <LibraryIcon dimension={35} color="#caf"/>,
    number_of_cheatsheets: librariesData.length,
  },
  {
    id: "os",
    _name: "Platforms",
    data: platformsData,
    icon: <OSIcon dimension={45} color="#1aa5e7" />,
    number_of_cheatsheets: platformsData.length,
  },
  {
    id: "run",
    _name: "Runtimes",
    data: runtimeData,
    icon: <RuntimeIcon dimension={40} color="#acd"/>,
    number_of_cheatsheets: runtimeData.length,
  },
  {
    id: "dev",
    _name: "Dev Tools",
    data: devToolsData,
    icon: <DevToolsIcon dimension={40} color="#aea" />,
    number_of_cheatsheets: devToolsData.length,
  },
];

export default dataList;
