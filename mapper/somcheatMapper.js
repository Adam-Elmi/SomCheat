import { Mapper, MDX } from "sommark";

const somcheatMapper = new Mapper();
somcheatMapper.outputs = MDX.outputs;
somcheatMapper.removeOutput("table");

const somcheat_imports = somcheatMapper.raw_js_imports([
	{ name: "Intro", path: "../../Somcheat-Components/Intro.astro" },
	{ name: "Structure", path: "../../Somcheat-Components/Structure.astro" },
	{ name: "Section", path: "../../Somcheat-Components/Section.astro" },
	{ name: "Code", path: "../../Somcheat-Components/Code.astro" },
	{ name: "Message", path: "../../Somcheat-Components/Message.astro" },
	{ name: "References", path: "../../Somcheat-Components/References.astro" },
	{ name: "Table", path: "../../Somcheat-Components/Table.astro" },
	{ name: "Steps", path: "../../Somcheat-Components/Steps.astro" },
	{ name: "Step", path: "../../Somcheat-Components/Step.astro" },
	{ name: "Colorize", path: "../../Somcheat-Components/Colorize.astro" },
	{ name: "ImageComponent", path: "../../Somcheat-Components/ImageComponent.astro" }
]);

const { tag, md, safeArg, makeFrontmatter } = somcheatMapper;

// ========================================================================== //
//  Imports and FrontMatter                                                   //
// ========================================================================== //
somcheatMapper.register(
	["Header", "header"],
	({ args }) => {
		return (
			makeFrontmatter({
				layout: "../../Layouts/SecondLayout.astro",
				title: safeArg(args, undefined, "title", null, null, ""),
				version: safeArg(args,undefined, "version", null, null, ""),
				release: safeArg(args,undefined, "release", null, null, ""),
				author: safeArg(args,undefined, "author", null, null, ""),
				category: safeArg(args,undefined, "category", null, null, "")
			}) + somcheat_imports
		);
	},
	{
		rules: {
			args: {
				required: ["title", "version", "release", "author", "category"]
			}
		}
	}
);
// ========================================================================== //
//  Into Component                                                            //
// ========================================================================== //
somcheatMapper.register(["Intro", "intro"], ({ content }) => {
  content = content;
	return tag("Intro").body(content);
});
// ========================================================================== //
//  Structure Component                                                       //
// ========================================================================== //
somcheatMapper.register(["Structure", "structure"], ({ content }) => {
	return tag("Structure").body(content);
});
// ========================================================================== //
//  Section Component                                                         //
// ========================================================================== //
somcheatMapper.register(["Section", "section"], ({ content }) => {
	return tag("Section").body(content);
});
// ========================================================================== //
//  Code Component                                                            //
// ========================================================================== //
somcheatMapper.register(
	["Code", "code"],
	({ args, content }) => {
		const lang = args[0] || args["lang"] || "text";
		const code = md.codeBlock(content, lang);
		return tag("Code")
			.attributes(args[1] ? { filename: args[1] || args["filename"] || "" } : null)
			.body(code);
	},
	{ escape: false }
);
// ========================================================================== //
//  Message Component                                                         //
// ========================================================================== //
somcheatMapper.register(["Message", "message"], ({ args, content }) => {
	return tag("Message").attributes({ type: args[0] }).body(content);
});
// ========================================================================== //
//  Table Component                                                           //
// ========================================================================== //
somcheatMapper.register(["Table", "table"], ({ args, content }) => {
	content = content.split("\n").filter(line => line !== "");
	return tag("Table")
		.props([
			{
				__type__: "other",
				headers: JSON.stringify(args)
			},
			{
				__type__: "other",
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
// ========================================================================== //
//   Steps Component                                                          //
// ========================================================================== //
somcheatMapper.register(["Steps", "steps"], ({ args, content }) => {
	return tag("Steps")
		.attributes({
			title: args[0],
			description: args[1]
		})
		.body(content);
});
// ========================================================================== //
//  Step Component                                                            //
// ========================================================================== //
somcheatMapper.register(["Step", "step"], ({ args, content }) => {
	return tag("Step").attributes({ title: args[0] }).body(content.trim());
});
// ========================================================================== //
//  References Component                                                      //
// ========================================================================== //
somcheatMapper.register(
	["References", "references"],
	({ content }) => {
		content = content.split("\n").filter(line => line !== "");
		return tag("References")
			.props([
				{
					__type__: "other",
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
			.selfClose();
	},
	{ escape: false }
);
// ========================================================================== //
//  Colorize Component                                                        //
// ========================================================================== //
somcheatMapper.register(["Colorize", "colorize"], ({ args, content }) => {
	return tag("Colorize")
		.props([
			{
				__type__: "string",
				color: args[0]
			},
			{
				__type__: "other",
				is_bold: args[1] ?? false
			},
			{
				__type__: "other",
				is_italic: args[2] ?? false
			},
			{
				__type__: "other",
				is_both: args[3] ?? false
			}
		])
		.body(content.trim());
});

export default somcheatMapper;
