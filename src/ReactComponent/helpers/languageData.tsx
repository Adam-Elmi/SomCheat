import dynamicPath from "../../utils/dynamic_path";
import { getData, getIndex } from "../../utils/handle_data";
import getProgress from "../../utils/progress";
import icon_detector from "./icon_detector";

/* 
------------------
Languages
------------------
*/
const languagesData = [
  {
    id: "js",
    name: "Javascript",
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
    id: "ts",
    name: "Typescript",
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
    id: "c",
    name: "C",
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
    id: "java",
    name: "Java",
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
    id: "rust",
    name: "Rust",
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
    id: "swift",
    name: "Swift",
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
    id: "r",
    name: "R",
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
    id: "go",
    name: "Golang",
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
    id: "lua",
    name: "Lua",
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
    id: "cs",
    name: "C#",
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
    id: "cpp",
    name: "C++",
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
    id: "py",
    name: "Python",
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
    id: "php",
    name: "Php",
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
    id: "rb",
    name: "Ruby",
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
    id: "kotlin",
    name: "Kotlin",
    targets: "mobile",
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
    id: "dart",
    name: "Dart",
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
    id: "ocaml",
    name: "Ocaml",
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
    id: "perl",
    name: "Perl",
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
    id: "soplang",
    name: "Soplang",
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
    id: "bash",
    name: "Bash",
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
    id: "powershell",
    name: "Powershell",
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
    id: "zsh",
    name: "Zsh",
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
    id: "fish",
    name: "Fish Shell",
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
    id: "html",
    name: "Html",
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
    id: "xml",
    name: "Xml",
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
    id: "yaml",
    name: "Yaml",
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
    id: "json",
    name: "Json",
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
    id: "markdown",
    name: "Markdown",
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
    id: "css",
    name: "Css",
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
    id: "sass",
    name: "Sass",
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

export default languagesData;