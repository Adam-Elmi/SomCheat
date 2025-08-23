import {
  CompletedIcon,
  InProgressIcon,
  InCompleteIcon,
} from "../icons/Status_Icons";
import { ArrowRightLongIcon } from "../icons/Arrow_Icons";
import SearchBar from "./SearchBar";
import Welcome from "./Welcome";
import { MobileIcon, DesktopIcon, WebIcon } from "../icons/Other_Icons";

const indicators = [
  {
    icon: <CompletedIcon dimension={22} color="oklch(0.765 0.177 163.223)" />,
    indicator: "Complete Cheatsheets",
  },
  {
    icon: (
      <span className="dark:text-slate-700 text-slate-200">
        <InProgressIcon color="oklch(0.707 0.165 254.624)" />
      </span>
    ),
    indicator: "In Progress Cheatsheets",
  },
  {
    icon: <InCompleteIcon color="#fb64b6" />,
    indicator: "Empty Cheatsheets",
  },
  {
    icon: <MobileIcon color="oklch(0.705 0.213 47.604)" />,
    indicator: "For Mobile",
  },
  {
    icon: <DesktopIcon color="oklch(0.673 0.182 276.935)" />,
    indicator: "For desktop",
  },
  {
    icon: <WebIcon color="oklch(0.746 0.16 232.661)" />,
    indicator: "For Web",
  },
];

export default function Wrapper() {
  return (
    <div className="min-h-[100px] h-auto pb-10 dark:bg-[#15151a]">
      <div className="flex gap-5 flex-wrap p-2 justify-center items-center">
        <Welcome />
      </div>
      <SearchBar />
      <div className="w-full flex justify-center items-center">
        <div className="min-w-[200px] flex flex-col gap-2 dark:bg-[#0f0f0f] bg-white min-h-[100px] shadow-md p-2 rounded dark:border-slate-800 border-2 border-slate-100 mt-5">
          {indicators &&
            indicators.map((status, id) => (
              <div key={id} className="flex gap-2">
                {status.icon}
                <span className="text-[#ddd] dark:text-slate-600">
                  <ArrowRightLongIcon />
                </span>
                <span className="text-blue-400 dark:text-indigo-400 italic">
                  {status.indicator}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
