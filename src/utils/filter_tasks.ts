import jsonData from "../../tasks/tasks.json";
import type {TaskData} from "../types/task";

const jData: any = jsonData;
export function extractFolders(): string[] {
  const folders: string[] = [];
  try {
    if (jsonData) {
      for (const props of jsonData) {
        folders.push(props.file.slice(0, props.file.lastIndexOf(".")));
      }
    }
  } catch (error) {
    console.error(error);
  }
  return folders;
}
const directories = extractFolders();

const tasks: TaskData[] = [];

function getTasks(): void {
  try {
    if (jData) {
      for (let i = 0; i < jData.length; i++) {
        tasks.push({
          [directories[i]]: jData[i][directories[i]],
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}
getTasks();

export function filterTasks(): TaskData[] {
  try {
    for (let i = 0; i < tasks.length; i++) {
      const dir: string = directories[i];
      const taskName = (tasks[i] as any)?.[dir ];
      taskName.finished_t = taskName.tasks.filter((_: undefined, i: number) =>
        taskName?.done_indices.includes(i),
      );
      taskName.unfinished_t = taskName.tasks.filter((_: undefined, i: number) =>
        taskName?.empty_indices.includes(i),
      );
    }
  } catch (error) {
    console.error(error);
  }
    return tasks;
}
