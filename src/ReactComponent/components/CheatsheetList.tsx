import { useState, useMemo } from "react";
import dataList from "../helpers/datalist";
import Card from "./Card";
import { SearchIcon } from "../icons/Other_Icons";
import type CheatsheetType from "../../types/cheatsheet";

export default function CheatsheetList() {
    const [searchTerm, setSearchTerm] = useState("");

    const allCheatsheets = useMemo(() => {
        return dataList.flatMap(category => category.data);
    }, []);

    const filteredCheatsheets = useMemo(() => {
        return allCheatsheets.filter((cheatsheet) =>
            cheatsheet.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allCheatsheets, searchTerm]);

    return (
        <div className="w-full flex flex-col justify-center items-center gap-5">
            {/* Search Bar */}
            <div className="w-100 max-w-full relative mt-5">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search cheatsheets..."
                    className="w-full p-2 pl-10 rounded-lg border-2 bg-white border-slate-200 dark:border-indigo-400 dark:bg-[#15151a] dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Cheatsheets Grid */}
            <div className="flex justify-center items-center flex-wrap p-4 gap-5 w-full">
                {filteredCheatsheets.length > 0 ? (
                    filteredCheatsheets.map((cheatsheet: CheatsheetType) => (
                        <a href={"/" + cheatsheet.path} key={cheatsheet.id}>
                            <Card cheatsheet={cheatsheet} />
                        </a>
                    ))
                ) : (
                    <div className="text-slate-500 italic mt-10">
                        No cheatsheets found for "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
}
