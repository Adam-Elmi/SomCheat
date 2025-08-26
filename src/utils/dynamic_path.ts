export default function dynamicPath(path: string) {
    if(!path) throw new Error("NO PATH PROVIDED!");
    return "cheatsheets/" + path;
}
