import { Mapper } from "sommark";

function getFrontmatter(title, version, release, author, category) {
	return `---
layout: "../../Layouts/SecondLayout.astro"
title: ${title}
version: ${version}
release_date: ${release}
author: ${Array.isArray(author) ? author.join(", ") : author}
category: ${category}
---
`;
}

const somcheat_imports = `import Intro from "../../Somcheat-Components/Intro.astro";
import Structure from "../../Somcheat-Components/Structure.astro";
import Section from "../../Somcheat-Components/Section.astro";
import Code from "../../Somcheat-Components/Code.astro";
import Message from "../../Somcheat-Components/Message.astro";
import Link from "../../Somcheat-Components/Link.astro";
import Table from "../../Somcheat-Components/Table.astro";
import Steps from "../../Somcheat-Components/Steps.astro";
import Step from "../../Somcheat-Components/Step.astro";
import Colorize from "../../Somcheat-Components/Colorize.astro";
`;

const somcheatMapper = new Mapper();
const { tag } = somcheatMapper;

somcheatMapper.create("Header", ({ args }) => {
	return getFrontmatter(args[0], args[1], args[2], args[3], args[4], args[5]) + "\n"+ somcheat_imports + "\n";
});

somcheatMapper.create("Structure", ({ content }) => {
	return tag("Structure").body(content);
});

somcheatMapper.create("Section", ({ content }) => {
	return tag("Section").body(content);
});

somcheatMapper.create("Code", ({ args, content }) => {
  return tag("Code").attributes( args[1] ? { filename: args[1] } : null).body("\n" +`\`\`\`${args[0]}\n${content}\n\`\`\`` + "\n");
}, {escape: false});
// console.log(somcheatMapper.outputs);
export default somcheatMapper;
