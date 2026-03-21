import { getData, getIndex } from "../utils/handle_data";
import getProgress from "../utils/progress";
import icon_detector from "../React/helpers/icon_detector";
import adjustText from "../utils/adjustText";
import type CheatsheetType from "../types/cheatsheet";
import type { TargetType } from "../types/cheatsheet";

class CheatsheetData {
  id: string;
  name: string;
  category: string;
  lastModified: string;
  path: string;
  icon: React.ReactNode;
  progress: number;
  targets?: TargetType | TargetType[]
  constructor(id: string, name: string, category: string, lastModified: string, targets?: TargetType | TargetType[]) {
    this.id = id;
    this.name = name === "_" ? adjustText(this.id) : name;
    this.category = category;
    this.path = this.getPath;
    this.icon = this.getIcon;
    this.progress = this.getProgressResult;
    this.targets = targets;

    this.lastModified = lastModified;
  }
  get getPath() {
    return `cheatsheets/${this.category.toLowerCase()}/${this.id}`;
  }
  get getIcon() {
    return icon_detector(this.id);
  }
  get getProgressResult() {
    return getProgress(getIndex, getData, this);
  }
}

class Category {
  id: string;
  _name: string;
  data: CheatsheetType[];
  icon: React.ReactNode;
  number_of_cheatsheets: number;

  constructor(
    id: string,
    _name: string,
    data: CheatsheetType[],
    icon: React.ReactNode,
    number_of_cheatsheets: number,
  ) {
    this.id = id;
    this._name = _name;
    this.data = data;
    this.icon = icon;
    this.number_of_cheatsheets = number_of_cheatsheets;
  }
}

class LanguageData extends CheatsheetData { }
class DatabaseData extends CheatsheetData { }
class FrameworkData extends CheatsheetData { }
class LibraryData extends CheatsheetData { }
class PlatformData extends CheatsheetData { }
class DevToolsData extends CheatsheetData { }
class RuntimeData extends CheatsheetData { }
class Other extends CheatsheetData { }

export {
  LanguageData,
  DatabaseData,
  FrameworkData,
  LibraryData,
  PlatformData,
  DevToolsData,
  RuntimeData,
  Other,
  Category,
};
