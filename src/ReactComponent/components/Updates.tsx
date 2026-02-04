import { useEffect, useState, useMemo } from "react";
import { extractFolders, filterTasks } from "../../utils/filter_tasks";
import replacer from "../../utils/replacer";
import AllTasks from "./AllTasks";
import FinishedTasks from "./FinishedTasks";
import UnfinishedTasks from "./UnfinishedTasks";

import { StatusIcon } from "../icons/Status_Icons";
import { DateIcon, SearchIcon } from "../icons/Other_Icons";
import { RightArrow, DownArrow } from "../icons/Arrow_Icons";
import icon_detector from "../helpers/icon_detector";

export default function Updates() {
  const dir = extractFolders();
  const tasks = filterTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [openState, setOpenState] = useState<Record<string, boolean>>({});

  const filteredData = useMemo(() => {
    if (!dir || !tasks) return [];
    return dir
      .map((d, i) => ({ dir: d, task: tasks[i] }))
      .filter((item) =>
        item.dir.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [dir, tasks, searchTerm]);

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

      // A. Restore State and Attach Listeners
      buttons.forEach((btn, index) => {
        if (!filteredData[index]) return;
        const uniqueKey = `${filteredData[index].dir}-${sectionId}`;

        // 1. Restore DOM state from React State
        if (openState[uniqueKey]) {
          containers[index].classList.add(showClass);
          mainContainers[index].classList.add(gapClass);
        } else {
          containers[index].classList.remove(showClass);
          mainContainers[index].classList.remove(gapClass);
        }

        (btn as HTMLElement).onclick = () => {
          mainContainers[index].classList.toggle(gapClass);
          containers[index].classList.toggle(showClass);

          setOpenState(prev => ({
            ...prev,
            [uniqueKey]: !prev[uniqueKey]
          }));
        };
      });
    };

    const timer = setTimeout(() => {
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
    }, 0);

    return () => clearTimeout(timer);
  }, [filteredData]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      {/* Search Input */}
      <div className="w-250 max-w-full relative my-5">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search progress..."
          className="w-full p-2 pl-10 rounded-lg border-2 bg-white border-slate-200 dark:border-indigo-400 dark:bg-[#15151a] dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          spellCheck={false}
        />
      </div>

      {filteredData.length > 0
        ? filteredData.map((item: any, i: number) => (
          <div
            key={i}
            className="w-250 max-w-full dark:border-indigo-400 dark:bg-[#15151a] bg-white h-fit rounded-lg border-2 border-slate-200 shadow-md p-5 flex flex-col gap-3"
          >
            {/* Title and Icon */}
            <div className="flex gap-3 items-center">
              {
                icon_detector(item.dir)
              }
              <h1 className="text-[1.2rem] font-semibold text-slate-500 italic">
                {replacer(item.dir)}
              </h1>
            </div>
            {/* Download bar */}
            <div
              className="w-full flex gap-2 items-center"
              title={
                "Progress: " + item.task[item.dir]?.finished_tasks_progress + "%"
              }
            >
              <span className="text-[#cdf] dark:text-slate-700">
                <StatusIcon />
              </span>
              <div className="flex-1 dark:bg-slate-700 bg-slate-100 rounded-sm">
                <div
                  style={{
                    width: `${item.task[item.dir]?.finished_tasks_progress
                      ? item.task[item.dir]?.finished_tasks_progress + "%"
                      : "0%"
                      }`,
                  }}
                  className="w-full h-2 bg-green-400 rounded-sm"
                ></div>
              </div>
              <span className="italic text-slate-400 font-medium">
                {item.task[item.dir]?.finished_tasks_progress
                  ? item.task[item.dir]?.finished_tasks_progress + "%"
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
              tasks={item.task[item.dir]}
              icon={openState[`${item.dir}-all`] ? <DownArrow color="#aaa" /> : <RightArrow color="#aaa" />}
            />
            {/* Finished Tasks */}
            <FinishedTasks
              tasks={item.task[item.dir]}
              icon={
                openState[`${item.dir}-finished`] ? <DownArrow color="#aaa" /> : <RightArrow color="#aaa" />
              }
            />
            {/* Unfinished Tasks */}
            <UnfinishedTasks
              tasks={item.task[item.dir]}
              icon={
                openState[`${item.dir}-unfinished`] ? <DownArrow color="#aaa" /> : <RightArrow color="#aaa" />
              }
            />
          </div>
        ))
        : (
          <div className="text-slate-500 italic mt-10">
            No progress found for "{searchTerm}"
          </div>
        )}
    </div>
  );
}
