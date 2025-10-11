import fs from "node:fs/promises";
import { getPath } from "../../lib/DocMerge/helpers/index.js";
async function content_hook(path, files) {
  for (let i = 0; i < files.length; i++) {
    const content = await fs.readFile(getPath(process.argv[2], files[i]));
    if(files.length === 2 && i == 1) {
      await fs.appendFile(path, `\n<Structure>\n${content}\n</Structure>`);
    } else if(i === 1) {
      await fs.appendFile(path, `\n<Structure>\n${content}` + "\n");
    } 
    else if(i === (files.length - 1)) {
      await fs.appendFile(path, `${content}\n</Structure>`);
    } else {
        await fs.appendFile(path, content + "\n");
    }  
  }
};
export default content_hook;