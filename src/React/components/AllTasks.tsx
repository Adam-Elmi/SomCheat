import { TaskStarIcon, TaskIcon } from "../icons/Task_Icons";
export default function AllTasks({
  tasks,
  icon,
}: {
  tasks: any;
  icon: React.ReactElement;
}) {
  return (
    <div
      id="all-tasks-main"
      className="flex transition-all duration-800 linear flex-col border border-slate-300 rounded-md p-2 dark:border-slate-800"
    >
      <button
        id="all-tasks-btn"
        className="cursor-pointer flex gap-2 items-center"
      >
        <h1 className="font-bold text-slate-500 flex-1 flex gap-2">
          {<TaskStarIcon />} All tasks
        </h1>
        <div className="flex gap-2">
          <span
            style={{ fontFamily: "Grand Hotel" }}
            className="text-slate-400 font-bold text-[1.1rem]"
          >
            {tasks?.tasks.length} Tasks
          </span>
          {icon}
        </div>
      </button>
      <div
        id="all-tasks"
        className="max-h-0 flex flex-col gap-2 overflow-hidden transition-all duration-300 linear ${
                    "
      >
        {tasks?.tasks.map((_t: any, i: number) => (
          <div key={"All-tasks" + _t + i} className="flex gap-2">
            <TaskIcon dimension={28} color="oklch(0.623 0.214 259.815)" />
            <p className="font-medium dark:text-slate-300 text-slate-600">
              {_t.slice(_t.indexOf(":") + 1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
