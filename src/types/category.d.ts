import type CheatsheetType from "./cheatsheet";

interface CategoryType {
  id: string;
  _name: string;
  data: CheatsheetType[];
  icon: React.ReactNode;
  number_of_cheatsheets: number;
}

export default CategoryType;
