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
    right_icon: <RocketIcon/>
  },
  {
    left_icon: <SmileBeamIcon color="#6364f1" />,
    message: (
      <>
        Ma u baahan tahay xasuusin degdeg ah?{" "}
        <span className="text-indigo-500">SomCheat</span> waa diyaar!
      </>
    ),
    right_icon: <BulbIcon/>
  },
  {
    left_icon: <WinkFaceIcon color="#6364f1" />,
    message: "Koodhkaaga fududee oo xasuuso waxa muhiimka ah!",
    right_icon: <ThunderIcon/>
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
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  const { left_icon, message, right_icon } = state;
  return (
    /* ------------------
        Main Container
    ------------------ */
    <div className="flex-1 flex flex-col rounded-md bg-gradient-to-r from-slate-50 to-amber-50 dark:from-slate-900 dark:to-indigo-700 dark:bg-[#0f0f0f] dark:border-slate-800 gap-4 justify-center items-center p-3 border-2 border-slate-200">
      {/* ------------------
          Welcome Message
      ------------------ */}
      {state ? (
        <div className="flex gap-2 items-center justify-center flex-wrap">
          <span>{left_icon}</span>
          <p className="roboto italic max-[750px]:text-sm font-bold text-center dark:text-slate-300  text-slate-700 text-[1.2rem]">
            <span className="flex items-center gap-2 flex-wrap justify-center">{message}{right_icon}</span>
          </p>
        </div>
      ) : null}
      {/* ------------------
          Action Buttons
      ------------------ */}
      <div className="flex gap-3 flex-wrap items-center justify-center">
        {/* ------------------
           Contribute Button
        ------------------ */}
        <a href="https://github.com/Adam-Elmi/SomCheat" title="Contribute to this project">
          <button className="cursor-pointer flex gap-2 items-center dark:border-slate-700 border-2 border-slate-500 p-2 rounded-md bg-[#111122e5]">
            <span className="font-semibold text-slate-200 hover:text-indigo-400 transition-all duration-200">
              Contribute
            </span>
            <GithubIcon color="#e2e8f0" />
          </button>
        </a>
        {/* ------------------
           Read Docs Button
        ------------------ */}
        <a href="https://github.com/Adam-Elmi/SomCheat/tree/master/docs" title="Read documentation">
          <button className="flex gap-2 items-center cursor-pointer dark:border-slate-700 border-2 border-slate-300 p-2 rounded-md  light:bg-white dark:bg-gradient-to-r from-indigo-500 to-indigo-600">
            <span className="flex-1 flex justify-between items-center gap-2 font-semibold text-slate-800  dark:text-slate-200 dark:hover:text-indigo-300 hover:text-indigo-400 transition-all duration-200">
              Read Docs
            <DocsIcon/>
            </span>
          </button>
        </a>
      </div>
    </div>
  );
}
