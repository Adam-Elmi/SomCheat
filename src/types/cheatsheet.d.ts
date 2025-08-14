type TargetType = "web" | "desktop" | "mobile";
interface CheatsheetType {
  id: string;
  name: string;
  lastUpdate: string;
  path: string;
  icon: React.ReactNode;
  progress: number;
  targets?: TargetType | TargetType[];
}

export default CheatsheetType;