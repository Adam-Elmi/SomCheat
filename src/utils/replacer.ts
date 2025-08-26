import pathJson from "../../data/path.json" with {type: "json"};
import { extractFolders } from "./filter_tasks";

export default function replacer(name_to_compare: string): string {
    let list_of_names: string[] = extractFolders();
    list_of_names = list_of_names.map(_name => _name.toLowerCase());
    for(const [key, value] of Object.entries(pathJson)) {
        if(list_of_names && list_of_names.length > 0) {
            if(name_to_compare === key && list_of_names.includes(key)) {
                return value.name;
            }
        }
    }
    return name_to_compare.slice(0, 1).toUpperCase() + name_to_compare.slice(1);
}

