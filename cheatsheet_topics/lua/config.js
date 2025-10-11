import fs from "node:fs/promises";
import { getPath } from "../../lib/DocMerge/helpers/index.js";
export default {
  outputDir: "./src/pages/cheatsheets",
  outputFile: "lua.mdx",
  imports: [
    'import Intro from "../../Somcheat-Components/Intro.astro";',
    'import Structure from "../../Somcheat-Components/Structure.astro";',
    'import Section from "../../Somcheat-Components/Section.astro";',
    'import Code from "../../Somcheat-Components/Code.astro";',
    'import Terminal from "../../Somcheat-Components/Terminal.astro";',
    'import Message from "../../Somcheat-Components/Message.astro";',
    'import Link from "../../Somcheat-Components/Link.astro";',
    'import Table from "../../Somcheat-Components/Table.astro";',
    'import Steps from "../../Somcheat-Components/Steps.astro";',
    'import Colorize from "../../Somcheat-Components/Colorize.astro";'
  ],
  frontmatter: `---
layout: "../../Layouts/SecondLayout.astro"
title: "Lua"
version: "5.4"
release_date: 1993
author: "Roberto Ierusalimschy, Waldemar Celes, Luiz Henrique de Figueiredo"
---`,
  hook: async(path, files) => {
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
  }
}