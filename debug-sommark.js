import fs from "node:fs/promises";
import SomMark from "sommark";
import somcheatMapper from "./mapper/somcheatMapper.js";

const buffer = await fs.readFile("./contents/js.smark");
const file_content = buffer.toString();
let smark = new SomMark({ src: file_content, format: "mdx", mapperFile: somcheatMapper });

// console.log(JSON.stringify(smark.parse(), null, 2));
// console.log(smark.lex());
console.log(await smark.transpile());
