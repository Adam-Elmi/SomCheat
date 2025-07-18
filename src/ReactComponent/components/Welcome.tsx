import { useState, useEffect } from "react";
import "../../styles/global.css";
import { DocsIcon } from "../icons/Other_Icons";
import { SmileIcon, SmileBeamIcon, WinkFaceIcon } from "../icons/Welcome_Icons";
import { GithubIcon } from "../icons/Social_Icons";
/* ------------------
    Welcome Messages
------------------ */
const welcome_messages: Array<object> = [
  {
    icon: <SmileIcon color="#6364f1" />,
    message: (
      <>
        Ku soo dhowow <span className="text-indigo-400">SomCheat</span>!
        Xasuusin degdeg ah oo koodhkaaga fududeynaya. 🚀
      </>
    ),
  },
  {
    icon: <SmileBeamIcon color="#6364f1" />,
    message: (
      <>
        Ma u baahan tahay xasuusin degdeg ah?{" "}
        <span className="text-indigo-400">SomCheat</span> waa diyaar! 💡
      </>
    ),
  },
  {
    icon: <WinkFaceIcon color="#6364f1" />,
    message: "Koodhkaaga fududee oo xasuuso waxa muhiimka ah! ⚡",
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

  const { icon, message } = state;
  return (
    /* ------------------
        Main Container
    ------------------ */
    <div className="flex flex-col gap-4 justify-center items-center p-3">
      {/* ------------------
          Welcome Message
      ------------------ */}
      {state ? (
        <div className="flex gap-2 items-center justify-center flex-wrap">
          <span>{icon}</span>
          <p className="roboto italic font-bold text-center dark:text-slate-300  text-slate-700 text-[1.2rem] max-[385px]:text-[1rem]">
            {message}
          </p>
        </div>
      ) : null}
      {/* ------------------
          Action Buttons
      ------------------ */}
      <div className="flex gap-3">
        {/* ------------------
           Contribute Button
        ------------------ */}
        <a href="https://github.com/Adam-Elmi/SomCheat" title="Contribute to this project">
          <button className="cursor-pointer flex gap-2 items-center dark:border-slate-700 border-2 border-slate-500 p-2 rounded-md bg-[#111122e5]">
            <span className="font-semibold text-slate-200 hover:text-blue-300">
              Contribute
            </span>
            <GithubIcon color="#e2e8f0" />
          </button>
        </a>
        {/* ------------------
           Read Docs Button
        ------------------ */}
        <a href="https://github.com/Adam-Elmi/SomCheat/tree/master/docs" title="Read documentation">
          <button className="flex gap-2 items-center cursor-pointer dark:border-slate-700 border-2 border-slate-300 p-2 rounded-md bg-slate-100 dark:bg-indigo-500">
            <span className="flex-1 flex justify-between items-center gap-2 font-semibold text-indigo-400 dark:text-slate-200 hover:text-slate-800">
              Read Docs
            <DocsIcon/>
            </span>
          </button>
        </a>
      </div>
    </div>
  );
}
