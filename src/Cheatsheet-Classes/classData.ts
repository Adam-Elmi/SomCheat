import dynamicPath from "../utils/dynamic_path";
import { getData, getIndex } from "../utils/handle_data";
import getProgress from "../utils/progress";
import icon_detector from "../ReactComponent/helpers/icon_detector";
import adjustText from "../utils/adjustText";
import type CheatsheetType from "../types/cheatsheet";
import type { TargetType } from "../types/cheatsheet";

class Data {
  id: string;
  name: string;
  lastUpdate: string;
  path: string;
  icon: React.ReactNode;
  progress: number;
  targets?: TargetType | TargetType[]
  constructor(id: string, name: string, lastUpdate: string, targets?: TargetType | TargetType[]) {
    this.id = id;
    this.name = name === "_" ? adjustText(this.id) : name;
    this.path = this.getPath;
    this.icon = this.getIcon;
    this.lastUpdate = lastUpdate;
    this.progress = this.getProgressResult;
    this.targets = targets;
  }
  get getPath() {
    return dynamicPath(this.id);
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
  data:CheatsheetType[];
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

class Language extends Data {}
class Database extends Data {}  
class Framework extends Data {}
class Library extends Data {}
class Platform extends Data {}
class DevTools extends Data {}
class Runtime extends Data {}
class BasicComputer extends Data {}
class Additional extends Data {}

export {
  Language,
  Database,
  Framework,
  Library,
  Platform,
  DevTools,
  Runtime,
  BasicComputer,
  Additional,
  Category,
};
