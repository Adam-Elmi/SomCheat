import type TaskType from "../types/task";
export default function getProgress(getIndex: Function, getData: Function, obj: any): number {
  try {
    obj.id = obj.id.split(" ")[0].toLowerCase();
    const index = getIndex(obj.id);
    return index !== null
      ? parseFloat(getData(index)[obj.id]?.finished_tasks_progress)
      : 0;
  } catch (error) {
    console.error(error);
  }
  return 0;
}
