import { Mapper } from "sommark";

function getFrontmatter(title, version, release, author, category) {
	return `---
layout: "../../Layouts/SecondLayout.astro"
title: ${title}
version: ${version}
release: ${release}
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
import ImageComponent from "../../Somcheat-Components/ImageComponent.astro";
`;

const somcheatMapper = new Mapper();
const { tag, md } = somcheatMapper;

somcheatMapper.register(["Header", "header"], ({ args }) => {
	return getFrontmatter(args.title, args.version, args.release, args.author, args.category) + "\n" + somcheat_imports + "\n";
}, {rules: {args: {
				required: ["title", "version", "release", "author", "category"]
			}}});

somcheatMapper.register(["Intro", "intro"], ({ content }) => {
	return "\n" + tag("Intro").body(content) + "\n";
});

somcheatMapper.register(["Structure", "structure"], ({ content }) => {
	return "\n" + tag("Structure").body(content)  + "\n";
});

somcheatMapper.register(["Section", "section"], ({ content }) => {
	return "\n" + tag("Section").body(content)  + "\n";
});

somcheatMapper.register(
	["Code", "code"],
	({ args, content }) => {
		const lang = args[0] || args["lang"] || "text";
		const code = md.codeBlock(content, lang);
		return "\n" + tag("Code")
			.attributes(args[1] ? { filename: args[1] || args["filename"] || "" } : null)
			.body(code) + "\n";
	},
	{ escape: false }
);

somcheatMapper.register(["Message", "message"], ({ args, content }) => {
	return "\n" + tag("Message").attributes({ type: args[0] }).body(content) + "\n";
});

somcheatMapper.register(["Table", "table"], ({ args, content }) => {
	content = content.split("\n").filter(line => line !== "");
	return "\n" + tag("Table")
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
		.selfClose() + "\n";
});

somcheatMapper.register(["Steps", "steps"], ({ args, content }) => {
	return "\n" + tag("Steps")
		.attributes({
			title: args[0],
			description: args[1]
		})
		.body(content) + "\n";
});

somcheatMapper.register(["Step", "step"], ({ args, content }) => {
	return "\n" + tag("Step").attributes({ title: args[0] }).body(content.trim()) + "\n";
});

somcheatMapper.register(
	["References", "references"],
	({ content }) => {
		content = content.split("\n").filter(line => line !== "");
		return (
			"\n" + tag("References")
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

somcheatMapper.register(["Colorize", "colorize"], ({ args, content }) => {
  return "\n" + tag("Colorize").props([
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
  ]).body(content.trim()) + "\n";
});

export default somcheatMapper;
