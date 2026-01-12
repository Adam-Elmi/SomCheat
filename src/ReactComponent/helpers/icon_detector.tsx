import all_cheat_icons from "./list_icons";

export default function icon_detector(cheatname: string) {
  try {
    if (all_cheat_icons && all_cheat_icons.hasOwnProperty(cheatname)) {
      return all_cheat_icons[cheatname as keyof typeof all_cheat_icons];
    }
    return all_cheat_icons.default;
  } catch (error) {
    console.error(error);
    return all_cheat_icons.default;
  }
}
