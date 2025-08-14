interface TaskType {
  finished_tasks_progress: string;
  unfinished_tasks_progress: string;
  done_len: number;
  empty_len: number;
  done_indices: Array<number>;
  empty_indices: Array<number>;
  tasks: Array<string>
  id: number;
  file: string;
}

export default TaskType;