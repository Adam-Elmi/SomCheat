import { useState, useEffect } from "react";
import { SearchIcon, SheetIcon } from "../icons/Other_Icons";
import type { SimpleCheatsheet } from "../../data/cheatsheets";

interface SearchBarProps {
  data: SimpleCheatsheet[];
}

export default function SearchBar({ data }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<SimpleCheatsheet[]>([]);

  const cleanedInput = (input: string) => {
    return input.replace(/[^a-zA-Z0-9-_.\s]/g, "").trim();
  };

  useEffect(() => {
    const cleanedTerm = cleanedInput(searchTerm);
    if (cleanedTerm === "") {
      setFilteredResults([]);
    } else {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(cleanedTerm.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [searchTerm, data]);

  const handleSearch = () => {
    const cleanedTerm = cleanedInput(searchTerm);
    if (cleanedTerm) {
      window.location.href = `/cheatsheets/${encodeURIComponent(cleanedTerm)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-12.5 px-2 bg-transparent w-full pt-3">
      <div className="bg-white dark:bg-[#15151a] w-175 max-w-full flex gap-4 justify-center items-center dark:border-slate-700 border border-slate-200 shadow-lg rounded-lg px-2 py-1 z-10">
        <div className="flex gap-2 flex-1 justify-center items-center">
          <span className="px-2">
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-1 outline-none w-full dark:text-slate-200"
            spellCheck={false}
          />
        </div>
        <button
          className="p-2 bg-linear-to-r from-indigo-500 to-indigo-600 italic font-medium rounded-md text-slate-200 cursor-pointer dark:border-slate-700 border-2 border-slate-200"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="px-2 mt-1 absolute w-full top-full flex justify-center items-center">
        {filteredResults.length > 0 && (
          <div className="dark:bg-[#15151a] dark:border-slate-700 bg-white border border-slate-300 shadow-lg rounded-lg w-full max-w-175 z-20">
            <ul className="max-h-60 overflow-y-auto">
              {filteredResults.map((item, index) => (
                <a
                  key={index}
                  href={`/cheatsheets/${item.id}`}
                  className="text-slate-400 italic"
                >
                  <li className="p-2 dark:border-slate-800/50 dark:hover:bg-slate-900 border-b border-slate-200/50 hover:bg-indigo-50 flex gap-2">
                    <SheetIcon color="oklch(67.3% 0.182 276.935)" />
                    {item.title}
                  </li>
                </a>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
