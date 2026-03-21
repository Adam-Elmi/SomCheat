import { useState, useEffect } from "react";
import "../../styles/global.css";
import { BulbIcon, DocsIcon, RocketIcon, ThunderIcon } from "../icons/Other_Icons";
import { SmileIcon, SmileBeamIcon, WinkFaceIcon } from "../icons/Welcome_Icons";
import { GithubIcon } from "../icons/Social_Icons";
/* ------------------
    Welcome Messages
------------------ */
const welcome_messages: Array<object> = [
  {
    left_icon: <SmileIcon color="#6364f1" />,
    message: (
      <>
        Ku soo dhowow <span className="text-indigo-400">SomCheat</span>!
        Xasuusin degdeg ah oo koodhkaaga fududeynaya.
      </>
    ),
    right_icon: <RocketIcon />
  },
  {
    left_icon: <SmileBeamIcon color="#6364f1" />,
    message: (
      <>
        Ma u baahan tahay xasuusin degdeg ah?{" "}
        <span className="text-indigo-500">SomCheat</span> waa diyaar!
      </>
    ),
    right_icon: <BulbIcon />
  },
  {
    left_icon: <WinkFaceIcon color="#6364f1" />,
    message: "Koodhkaaga fududee oo xasuuso waxa muhiimka ah!",
    right_icon: <ThunderIcon />
  },
];

export default function Welcome() {
  /* ------------------
      State Management
  ------------------ */
  const [state, setState] = useState<any>(welcome_messages[0]);

  let counter = 0;
  useEffect(() => {
    let interval = setInterval(() => {
      counter++;
      if (counter === 3) counter = 0;
      setState(welcome_messages[counter]);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  const { left_icon, message, right_icon } = state;
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#15151a] shadow-sm">
      {/* Background Gradient */}
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 sm:p-8">

        {/* Message Area */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start text-center md:text-left">
          <div className="shrink-0 p-3 bg-indigo-50 dark:bg-slate-800 rounded-full">
            {left_icon}
          </div>

          <div className="flex items-center gap-1">
            <h2 className="text-md sm:text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight">
              {message}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm">
              <span>{right_icon}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 items-center justify-center shrink-0">
          <a
            href="https://github.com/Adam-Elmi/SomCheat"
            target="_blank"
            rel="noopener noreferrer"
            title="Contribute to this project"
          >
            <button className="group cursor-pointer flex gap-2.5 items-center px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-white dark:bg-[#101012] dark:hover:bg-[#15151a] border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow">
              <span className="font-semibold text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Contribute
              </span>
              <span className="text-slate-500 group-hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-400 transition-colors">
                <GithubIcon color="currentColor" />
              </span>
            </button>
          </a>

          <a
            href="https://github.com/Adam-Elmi/SomCheat/tree/master/docs"
            target="_blank"
            rel="noopener noreferrer"
            title="Read documentation"
          >
            <button className="group cursor-pointer flex gap-2.5 items-center px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-95 transition-all duration-200">
              <span className="font-semibold">
                Read Docs
              </span>
              <DocsIcon />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
