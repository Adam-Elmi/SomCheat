import dynamicPath from "../utils/dynamic_path";
import { getData, getIndex } from "../utils/handle_data";
import getProgress from "../utils/progress";
import icon_detector from "../ReactComponent/helpers/icon_detector";
import adjustText from "../utils/adjustText";
import type CheatsheetType from "../types/cheatsheet";
import type { TargetType } from "../types/cheatsheet";
import metadata from "../../data/metadata.json";
import { formatDate } from "../utils/formatDate";

class CheatsheetData {
  id: string;
  name: string;
  lastUpdate: string;
  path: string;
  icon: React.ReactNode;
  progress: number;
  targets?: TargetType | TargetType[]
  constructor(id: string, name: string, lastUpdate: string, targets?: TargetType | TargetType[], frontmatterDate?: string) {
    this.id = id;
    this.name = name === "_" ? adjustText(this.id) : name;
    this.path = this.getPath;
    this.icon = this.getIcon;
    this.progress = this.getProgressResult;
    this.targets = targets;

    this.lastUpdate = lastUpdate;

    const metadataKey = `pages/cheatsheets/${id}.mdx`;
    // @ts-ignore
    if (metadata[metadataKey]) {
      // @ts-ignore
      const dateStr = metadata[metadataKey].lastUpdated;
      this.lastUpdate = formatDate(dateStr);
    }

    if (frontmatterDate) {
      this.lastUpdate = formatDate(frontmatterDate);
    }
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
class ConceptData extends CheatsheetData { }
class AdditionalData extends CheatsheetData { }

export {
  LanguageData,
  DatabaseData,
  FrameworkData,
  LibraryData,
  PlatformData,
  DevToolsData,
  RuntimeData,
  ConceptData,
  AdditionalData,
  Category,
};
