import type CheatsheetType from "../types/cheatsheet";
export default function getProgress(getIndex: Function, getData: Function, obj: CheatsheetType): number {
  try {
    const index: number = getIndex(obj.id);
    return index !== null
      ? parseFloat(getData(index)[obj.id]?.finished_tasks_progress)
      : 0;
  } catch (error) {
    console.error(error);
  }
  return 0;
}
