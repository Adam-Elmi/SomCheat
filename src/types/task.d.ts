type TaskProgress = {
  finished_tasks_progress: string;
  unfinished_tasks_progress: string;
  done_len: number;
  empty_len: number;
  done_indices: number[];
  empty_indices: number[];
  tasks: string[];
};

export type TaskData = {
  [key]: TaskProgress | object
}

type TaskType = {
  id: number;
  file: string;
  [key]: TaskProgress | object;
};

export default TaskType;