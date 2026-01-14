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
import References from "../../Somcheat-Components/References.astro";
import Table from "../../Somcheat-Components/Table.astro";
import Steps from "../../Somcheat-Components/Steps.astro";
import Step from "../../Somcheat-Components/Step.astro";
import Colorize from "../../Somcheat-Components/Colorize.astro";
`;

const somcheatMapper = new Mapper();
const { tag } = somcheatMapper;

somcheatMapper.create(["Header", "header"], ({ args }) => {
	return getFrontmatter(args[0], args[1], args[2], args[3], args[4], args[5]) + "\n" + somcheat_imports + "\n";
});

somcheatMapper.create(["Intro", "intro"], ({ content }) => {
	return tag("Intro").body(content) + "\n";
});

somcheatMapper.create(["Structure", "structure"], ({ content }) => {
	return tag("Structure").body(content)  + "\n";
});

somcheatMapper.create(["Section", "section"], ({ content }) => {
	return tag("Section").body(content)  + "\n";
});

somcheatMapper.create(
	["Code", "code"],
	({ args, content }) => {
		return tag("Code")
			.attributes(args[1] ? { filename: args[1] } : null)
			.body("\n" + `\`\`\`${args[0]}\n${content}\n\`\`\`` + "\n");
	},
	{ escape: false }
);

somcheatMapper.create(["Message", "message"], ({ args, content }) => {
	return tag("Message").attributes({ type: args[0] }).body(content);
});

somcheatMapper.create(["Table", "table"], ({ args, content }) => {
	content = content.split("\n").filter(line => line !== "");
	return tag("Table")
		.props([
			{
				type: "other",
				headers: JSON.stringify(args)
			},
			{
				type: "other",
				body: JSON.stringify(
					content.map(line => {
						let rowData = line.split(",");
						rowData = rowData.map(r => {
							r = r.trim();
							if (r.startsWith("-")) {
								r = r.slice(1).trim();
							}
							return r;
						});
						return { row: rowData };
					})
				)
			}
		])
		.selfClose();
});

somcheatMapper.create(["Steps", "steps"], ({ args, content }) => {
	return tag("Steps")
		.attributes({
			title: args[0],
			description: args[1]
		})
		.body(content + "\n");
});

somcheatMapper.create(["Step", "step"], ({ args, content }) => {
	return tag("Step").attributes({ title: args[0] }).body(content);
});

somcheatMapper.create(
	["References", "references"],
	({ content }) => {
		content = content.split("\n").filter(line => line !== "");
		return (
			tag("References")
				.props([
					{
						type: "other",
						references: JSON.stringify(
							content.map(ref => {
								ref = ref.split(",").filter(value => value != "");
								return { title: ref[0], url: ref[1], description: ref[2] };
							}),
							null,
							2
						)
					}
				])
				.selfClose() + "\n"
		);
	},
	{ escape: false }
);

somcheatMapper.create(["Colorize", "colorize"], ({ args, content }) => {
  return tag("Colorize").props([
    {
      type: "string",
      color: args[0]
    },
    {
      type: "other",
      is_bold: args[1] ?? false
    },
    {
      type: "other",
      is_italic: args[2] ?? false
    },
    {
      type: "other",
      is_both: args[3] ?? false
    }
  ]).body(content) + "\n";
});

export default somcheatMapper;
