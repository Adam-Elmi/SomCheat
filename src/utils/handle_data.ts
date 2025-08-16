import json from "../../tasks/tasks.json";
import type TaskType from "../types/task";

const jsonData: TaskType[] = json;

export function getIndex(filename: string) {
  try {
    if(jsonData) {
        const index = jsonData.findIndex((d) => d?.hasOwnProperty(filename));
        return index !== -1 ? index : null;
    }
  } catch (error) {
    console.error(error);
  }
    return null;
}

export function getData(index?: number) {
  try {
    if (jsonData) {
      return index && jsonData[index];
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}