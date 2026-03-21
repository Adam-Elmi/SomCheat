import {
  CompletedIcon,
  InProgressIcon,
  InCompleteIcon,
} from "../icons/Status_Icons";
import { ArrowRightLongIcon } from "../icons/Arrow_Icons";
import SearchBar from "./SearchBar";
import Welcome from "./Welcome";
import { MobileIcon, DesktopIcon, WebIcon } from "../icons/Other_Icons";
import type { SimpleCheatsheet } from "../../data/cheatsheets";

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

interface WrapperProps {
  cheatsheets: SimpleCheatsheet[];
}

export default function Wrapper({ cheatsheets }: WrapperProps) {
  return (
    <div className="min-h-25 h-auto pb-16 pt-8 flex flex-col gap-8 w-full max-w-7xl mx-auto px-4">

      {/* Welcome Section */}
      <div className="w-full flex justify-center items-center">
        <Welcome />
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <SearchBar data={cheatsheets} />
      </div>

      {/* Legend / Indicators */}
      <div className="w-full flex justify-center items-center mt-4">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-5 group-hover:opacity-10 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative w-full sm:min-w-[400px] flex flex-col gap-3 dark:bg-[#15151a]/95 bg-white/90 backdrop-blur-md shadow-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2">
              Indicators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {indicators &&
                indicators.map((status, id) => (
                  <div key={id} className="flex items-center gap-3 group/item">
                    <span className="shrink-0 transition-transform group-hover/item:scale-110 duration-200">
                      {status.icon}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">
                      <ArrowRightLongIcon />
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                      {status.indicator}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
