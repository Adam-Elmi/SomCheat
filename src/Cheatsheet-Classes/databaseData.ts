import dynamicPath from "../utils/dynamic_path";
import { getData, getIndex } from "../utils/handle_data";
import getProgress from "../utils/progress";
import icon_detector from "../ReactComponent/helpers/icon_detector";

/* 
  ------------------
  Databases
  ------------------
*/
const databasesData = [
  {
    id: "mysql",
    name: "MySQL",
    get path() {
      return dynamicPath(this.id);
    },
    get icon() {
      return icon_detector(this.id);
    },
    lastUpdate: "Feb 27, 2025",
    get progress() {
      return getProgress(getIndex, getData, this);
    },
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    get path() {
      return dynamicPath(this.id);
    },
    get icon() {
      return icon_detector(this.id);
    },
    lastUpdate: "Feb 27, 2025",
    get progress() {
      return getProgress(getIndex, getData, this);
    },
  },
  {
    id: "sqlite",
    name: "SQLite",
    get path() {
      return dynamicPath(this.id);
    },
    get icon() {
      return icon_detector(this.id);
    },
    lastUpdate: "Feb 27, 2025",
    get progress() {
      return getProgress(getIndex, getData, this);
    },
  },
  {
    id: "mongodb",
    name: "MongoDB",
    get path() {
      return dynamicPath(this.id);
    },
    get icon() {
      return icon_detector(this.id);
    },
    lastUpdate: "Feb 27, 2025",
    get progress() {
      return getProgress(getIndex, getData, this);
    },
  },
  {
    id: "redis",
    name: "Redis",
    get path() {
      return dynamicPath(this.id);
    },
    get icon() {
      return icon_detector(this.id);
    },
    lastUpdate: "Feb 27, 2025",
    get progress() {
      return getProgress(getIndex, getData, this);
    },
  },
  {
    id: "firestore",
    name: "Firestore",
    get path() {
      return dynamicPath(this.id);
    },
    get icon() {
      return icon_detector(this.id);
    },
    lastUpdate: "Feb 27, 2025",
    get progress() {
      return getProgress(getIndex, getData, this);
    },
  },
];

export default databasesData;