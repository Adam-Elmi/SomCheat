import { useEffect, useState } from "react";
import { extractFolders, filterTasks } from "../../utils/filter_tasks";
import replacer from "../../utils/replacer";
import AllTasks from "./AllTasks";
import FinishedTasks from "./FinishedTasks";
import UnfinishedTasks from "./UnfinishedTasks";

import { StatusIcon } from "../icons/Status_Icons";
import { DateIcon } from "../icons/Other_Icons";
import { RightArrow, DownArrow } from "../icons/Arrow_Icons";
import icon_detector from "../helpers/icon_detector";

export default function Updates() {
  const dir = extractFolders();
  const tasks = filterTasks();
  const [suitableIcons, setSuitableIcons] = useState<{
    [key: string]: React.ReactElement;
  }>({});

  useEffect(() => {
    const toggleTaskVisibility = (
      sectionId: string,
      btnSelector: string,
      containerSelector: string,
      mainContainer: string,
      gapClass: string,
      showClass: string
    ) => {
      const containers = [...document.querySelectorAll(containerSelector)];
      const buttons = [...document.querySelectorAll(btnSelector)];
      const mainContainers = [...document.querySelectorAll(mainContainer)];

      buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          const uniqueKey = `${sectionId}-${index}`;

          mainContainers[index].classList.toggle(gapClass);
          if (containers[index].classList.contains(showClass)) {
            containers[index].classList.remove(showClass);
            setSuitableIcons((prev) => ({
              ...prev,
              [uniqueKey]: <RightArrow color="#aaa" />,
            }));
          } else {
            containers[index].classList.add(showClass);
            setSuitableIcons((prev) => ({
              ...prev,
              [uniqueKey]: <DownArrow color="#aaa" />,
            }));
          }
        });
      });
    };

    toggleTaskVisibility(
      "all",
      "#all-tasks-btn",
      "#all-tasks",
      "#all-tasks-main",
      "add-gap",
      "show-all-tasks"
    );
    toggleTaskVisibility(
      "finished",
      "#finished-tasks-btn",
      "#finished-tasks",
      "#finished-tasks-main",
      "add-gap",
      "show-finished-tasks"
    );
    toggleTaskVisibility(
      "unfinished",
      "#unfinished-tasks-btn",
      "#unfinished-tasks",
      "#unfinished-tasks-main",
      "add-gap",
      "show-unfinished-tasks"
    );
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      {tasks
        ? tasks.map((task: any, i: number) => (
            <div
              key={i}
              className="w-[1000px] max-w-full dark:border-slate-800 dark:bg-slate-900/95 bg-white h-fit rounded-lg border-2 border-slate-200 shadow-md p-5 flex flex-col gap-3"
            >
              {/* Title and Icon */}
              <div className="flex gap-3 items-center">
                {
                  icon_detector(dir[i])
                }
                <h1 className="text-[1.2rem] font-semibold text-slate-500 italic">
                  {replacer(dir[i])}
                </h1>
              </div>
              {/* Download bar */}
              <div
                className="w-full flex gap-2 items-center"
                title={
                  "Progress: " + task[dir[i]]?.finished_tasks_progress + "%"
                }
              >
                <span className="text-[#cdf] dark:text-slate-700">
                  <StatusIcon/>
                </span>
                <div className="flex-1 dark:bg-slate-700 bg-slate-100 rounded-sm">
                  <div
                    style={{
                      width: `${
                        task[dir[i]]?.finished_tasks_progress
                          ? task[dir[i]]?.finished_tasks_progress + "%"
                          : "0%"
                      }`,
                    }}
                    className="w-full h-[8px] bg-green-400 rounded-sm"
                  ></div>
                </div>
                <span className="italic text-slate-400 font-medium">
                  {task[dir[i]]?.finished_tasks_progress
                    ? task[dir[i]]?.finished_tasks_progress + "%"
                    : "0%"}
                </span>
              </div>
              {/* Date */}
              <span className="text-slate-500 text-[0.8rem] ml-2 flex gap-2 items-center">
                <DateIcon dimension={15} color="#aaa" />
                <span title={"Last Update: " + "Nov 12"} className="font-mono">
                  {"Nov 12"}
                </span>
              </span>
              {/* All tasks */}
              <AllTasks
                tasks={task[dir[i]]}
                icon={suitableIcons[`all-${i}`] || <RightArrow color="#aaa" />}
              />
              {/* Finished Tasks */}
              <FinishedTasks
                tasks={task[dir[i]]}
                icon={
                  suitableIcons[`finished-${i}`] || <RightArrow color="#aaa" />
                }
              />
              {/* Unfinished Tasks */}
              <UnfinishedTasks
                tasks={task[dir[i]]}
                icon={
                  suitableIcons[`unfinished-${i}`] || (
                    <RightArrow color="#aaa" />
                  )
                }
              />
            </div>
          ))
        : null}
    </div>
  );
}
