import dJson from "../../tasks/tasks.json";

const jsonData: Array<{}> = dJson;

export function getIndex(file: string) {
  try {
    if(jsonData) {
        const index = jsonData.findIndex((d) => d?.hasOwnProperty(file));
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