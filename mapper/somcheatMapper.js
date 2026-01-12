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

const somcheatMapper = new Mapper();
const { tag } = somcheatMapper;

somcheatMapper.create("Header", ({ args }) => {
	return getFrontmatter(args[0], args[1], args[2], args[3], args[4], args[5]);
});

somcheatMapper.create("Section", ({ content }) => {
	return tag("Section").body(content);
});

somcheatMapper.create("Code", ({ args, content }) => {
  return tag("Code").attributes( args[1] ? { filename: args[1] } : null).body("\n" +`\`\`\`${args[0]}\n${content}\n\`\`\`` + "\n");
});
// console.log(somcheatMapper.outputs);
export default somcheatMapper;
