import content_hook from "../../src/utils/content_hook.js";
export default {
  outputDir: "./src/pages/cheatsheets",
  outputFile: "js.mdx",
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
title: "Javascript"
version: "ES2023"
release_date: 1995
author: "Brendan Eich"
---`,
  hook: content_hook
}