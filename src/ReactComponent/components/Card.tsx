import {
  DateIcon,
  DesktopIcon,
  MobileIcon,
  WebIcon,
} from "../icons/Other_Icons";
import { StatusIcon } from "../icons/Status_Icons";
import { FileCodeIcon } from "../icons/lang_icons";
import {
  CompletedIcon,
  InProgressIcon,
  InCompleteIcon,
} from "../icons/Status_Icons";
import type CheatsheetType from "../../types/cheatsheet";

export default function Card({ cheatsheet }: { cheatsheet: CheatsheetType }) {
  type TargetType = "web" | "desktop" | "mobile";
  const labelIcon:Record<TargetType, React.ReactNode> = {
    web: (
      <span className="text-sky-400">
        <WebIcon />
      </span>
    ),
    desktop: (
      <span className="text-indigo-400">
        <DesktopIcon />
      </span>
    ),
    mobile: (
      <span className="text-orange-500">
        <MobileIcon />
      </span>
    )
  }
  const labels = Array.isArray(cheatsheet.targets)
      ? cheatsheet.targets.map(target => labelIcon[target] ?? null)
      : [];

  function displayLabel() {
      if (typeof cheatsheet.targets === "string") {
        return labelIcon[cheatsheet.targets] ?? null;
      }
    }
  return (
    <a href={cheatsheet.path}>
      <div className="relative dark:bg-[#111122] bg-white dark:border-slate-800 border-[1.5px] m-1 border-slate-200 shadow-md p-4 rounded-md min-w-[300px] max-w-full">
        {/*
          ------------------
          Label
          ------------------
        */}
        <div className="absolute top-2 right-10 flex gap-2">
          {cheatsheet.targets && typeof cheatsheet.targets === "string" ? displayLabel() : Array.isArray(cheatsheet.targets) && cheatsheet.targets.length > 0 ? labels.map((label) => (
            <>
              {label}
            </>
          )) : null}
        </div>
        <Label progress={cheatsheet.progress} />
        {/*
          ------------------
          Metadata of the cheatsheet such as cheatsheet name, icon and date
          ------------------
          */}
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2 items-center">
            {cheatsheet.icon ? cheatsheet.icon : <FileCodeIcon />}
            <h1 className="italic text-[1rem] font-bold dark:text-slate-200 text-slate-700">
              {cheatsheet.name}
            </h1>
          </div>
          <span className="text-slate-500 text-[0.8rem] ml-2 flex gap-2 items-center">
            <DateIcon dimension={15} color="#aaa" />
            <span
              title={"Last Update: " + cheatsheet.lastUpdate}
              className="font-mono"
            >
              {cheatsheet.lastUpdate}
            </span>
          </span>
        </div>
        {/*
          ------------------
          Separator line
          ------------------
          */}
        <hr className="dark:border-slate-800 border-b border-slate-100 my-1" />
        {/*
          ------------------
          Progress bar
          ------------------
          */}
        <div
          className="w-full flex gap-2 items-center"
          title={"Progress: " + String(cheatsheet.progress) + "%"}
        >
          <span className="text-[#cdf] dark:text-slate-700">
            <StatusIcon />
          </span>
          <div className="flex-1 dark:bg-slate-700 bg-slate-100 rounded-sm">
            <div
              style={{
                width: `${
                  cheatsheet.progress ? cheatsheet.progress + "%" : "0%"
                }`,
              }}
              className="w-full h-[6px] bg-green-300 rounded-sm"
            ></div>
          </div>
          <span className="italic text-slate-400 font-medium">
            {cheatsheet.progress ? cheatsheet.progress + "%" : "0%"}
          </span>
        </div>
      </div>
    </a>
  );
}

function Label({ progress }: { progress: number }) {
  const statusIcon = (icon: React.ReactElement, title: string) => {
    return (
      <span title={title} className="absolute top-2 right-2">
        {icon}
      </span>
    );
  };
  const status = () => {
    if (progress && progress === 100) {
      return statusIcon(
        <CompletedIcon dimension={22} color="oklch(0.765 0.177 163.223)" />,
        "Completed",
      );
    } else if (progress > 0 && progress < 100) {
      return statusIcon(
        <span className="dark:text-slate-700 text-slate-200">
          <InProgressIcon
            progress_number={progress}
            color="oklch(0.707 0.165 254.624)"
          />
        </span>,
        "In Progress",
      );
    } else {
      return statusIcon(
        <InCompleteIcon dimension={25} color="#fb64b6" />,
        "Empty",
      );
    }
  };
  return status();
}
