import { TaskCheckedIcon } from "../icons/Task_Icons";
import { CheckedIcon } from "../icons/Status_Icons";

export default function FinishedTasks({
  tasks,
  icon,
}: {
  tasks: any;
  icon: React.ReactElement;
}) {
  return (
    <div
      id="finished-tasks-main"
      className="flex transition-all duration-300 linear
                } flex-col border border-slate-300 rounded-md p-2 dark:border-slate-800"
    >
      <button
        id="finished-tasks-btn"
        className="cursor-pointer flex gap-2 items-center"
      >
        <h1 className="font-bold text-slate-500 flex-1 flex gap-2">
          {<TaskCheckedIcon />} Finished Tasks
        </h1>
        <div className="flex gap-2">
          <span
            style={{ fontFamily: "Grand Hotel" }}
            className="text-slate-400 font-bold text-[1.1rem]"
          >
            {tasks?.done_len} Tasks
          </span>
          {icon}
        </div>
      </button>
      <div
        id="finished-tasks"
        className="max-h-0 flex flex-col gap-2 overflow-hidden transition-all duration-300 linear"
      >
        {tasks?.finished_t.map((_t: any, i: number) => (
          <div key={"Finished-Tasks" + _t + i} className="flex gap-2">
            <CheckedIcon dimension={28} color="oklch(0.696 0.17 162.48)" />
            <p className="font-medium dark:text-slate-300 text-slate-600">
              {_t.slice(_t.indexOf(":") + 1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
