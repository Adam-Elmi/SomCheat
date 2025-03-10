import { JsIcon } from "../icons/Icon";
import jsonData from "../../../tasks/tasks.json";

console.log(jsonData);

function dynamicPath(path: string) {
  return `cheatsheets/${path.split(" ")[0].toLowerCase()}`;
}

async function lastUpdate() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Adam-Elmi/SomCheat/commits?sha=master&path=src/pages/cheatsheets/js.md&per_page=1"
    );
    const commits = await response.json();

    console.log("Fetched commits:", commits); // Debugging

    if (commits.length > 0) {
      let lastUpdate = commits[0].commit.committer.date;
      let onlyDate = lastUpdate.split("T")[0];
      console.log("Last updated:", onlyDate);
      return onlyDate;
    } else {
      console.log("No updates found for js.md");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

lastUpdate();

function getIndex(file: any): any {
  try {
    const index = jsonData.findIndex((d) => d?.hasOwnProperty(file));
    return index !== -1 ? index : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
console.log(getData(getIndex("lua"))?.lua.unfinished_tasks_progress);

function getData(file?: any): any {
  try {
    if (jsonData) {
      return jsonData[file];
    }
  } catch (error) {}
}

// Programming Languages
export const languagesData = [
  {
    id: "js",
    name: "Javascript",
    get path() {
      return dynamicPath(this.name);
    },
    icon: <JsIcon />,
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
  {
    id: "c",
    name: "C",
    get path() {
      return dynamicPath(this.name);
    },
    icon: "",
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
  {
    id: "go",
    name: "Golang",
    get path() {
      return dynamicPath(this.name);
    },
    icon: "",
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
  {
    id: "lua",
    name: "Lua",
    get path() {
      return dynamicPath(this.name);
    },
    icon: "",
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
  {
    id: "lua",
    name: "Lua",
    get path() {
      return dynamicPath(this.name);
    },
    icon: "",
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
];

// Databases
export const databasesData = [
  {
    id: "mongodb",
    name: "MongoDB",
    get path() {
      return dynamicPath(this.name);
    },
    icon: "",
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
];

// Web Development
export const webDevelopmentData = [
  {
    id: "css",
    name: "Css",
    get path() {
      return dynamicPath(this.name);
    },
    icon: "",
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
];

// Operating System
export const operatingSystemData = [
  {
    id: "linux",
    name: "Linux",
    get path() {
      return dynamicPath(this.name);
    },
    icon: "",
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
];

// Operating System
export const versionControlData = [
  {
    id: "git",
    name: "Git",
    get path() {
      return dynamicPath(this.name);
    },
    icon: "",
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
];

// Dev Tools
export const devToolsData = [
  {
    id: "git",
    name: "Git",
    get path() {
      return dynamicPath(this.name);
    },
    icon: "",
    lastUpdate: "Feb 27, 2025",
    get progress() {
      const index = getIndex(this.id);
      return index !== null
        ? parseInt(getData(index)[this.id]?.finished_tasks_progress)
        : 0;
    },
  },
];
