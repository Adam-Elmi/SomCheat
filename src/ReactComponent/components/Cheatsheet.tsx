import dataList from "../helpers/datalist";
import { SheetIcon } from "../icons/Other_Icons";
import Card from "./Card";
import type CheatsheetType from "../../types/cheatsheet";
import type CategoryType from "../../types/category";
import { extractFolders } from "../../utils/filter_tasks";


export default function CheatSheet() {
  console.log(extractFolders())
  return (
    <div className="w-full flex flex-col">
      {/* 
        ------------------
        Mapping through dataList to render each category
        ------------------
      */}
      {dataList.map(({ id, data, _name, icon, number_of_cheatsheets }: CategoryType) => (
        <div key={id} className="flex flex-col flex-wrap">
          {/* 
            ------------------
            Category Header
            ------------------
          */}
          <div
            key={id}
            className="bg-[#ffeecc44] dark:bg-slate-900/95 flex flex-col gap-3 shadow-md border-b-2 border-indigo-400 p-2 w-full"
          >
            <div className="flex gap-3 items-center">
              {icon}
              <h1 className="text-[1.1rem] font-medium text-slate-500 italic">
                {
                  id === "langs"
                  ? _name
                  : id === "dbs"
                  ? _name
                  : id === "frame"
                  ? _name
                  : id === "os"
                  ? _name
                  : id === "lib"
                  ? _name
                  : id === "run"
                  ? _name
                  : id === "dev"
                  ? _name
                  : id === "add" 
                  ?  _name
                  : id === "comp" ? _name : ""}
              </h1>
            </div>
            {/* 
              ------------------
              Total Cheatsheets Info
              ------------------
            */}
            <span
              style={{ fontFamily: "Kalam" }}
              className="text-[1.2rem] flex gap-2 dark:text-indigo-400"
            >
              <span className="text-slate-400 flex gap-2">
                <SheetIcon dimension={20} /> Total Cheatsheets:
              </span>{" "}
              {number_of_cheatsheets}
            </span>
          </div>
          {/* 
            ------------------
            Cheatsheets Cards Section
            ------------------
          */}
          <div
            id="section-bar"
            className="flex dark:bg-[#0f0f0f] gap-5 py-3 flex-wrap items-center justify-center"
          >
            {
              data
              ? data.sort((a: CheatsheetType, b: CheatsheetType) => {
                const progressA = Number(a.progress) || 0;
                const progressB = Number(b.progress) || 0;
                 return progressB - progressA;
             }).map((cheatsheet: CheatsheetType, id: number) => (
                  <Card cheatsheet={cheatsheet} key={id} />
                ))
              : null}
          </div>
        </div>
      ))}
    </div>
  );
}