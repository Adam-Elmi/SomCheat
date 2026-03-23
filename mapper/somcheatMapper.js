import { Mapper, MDX } from "sommark";

const somcheat_mapper = new Mapper();
somcheat_mapper.inherit(MDX);
const { tag, safeArg, md } = somcheat_mapper;
// Headings
["h1", "h2", "h3", "h4", "h5", "h6"].forEach(heading => {
	somcheat_mapper.register(
		heading,
		({ content }) => {
			const lvl = heading[1] && typeof Number(heading[1]) === "number" ? heading[1] : 1;
			return md.heading(content.trim(), lvl);
		},
		{ type: "Block" }
	);
});
// ========================================================================== //
//  Components                                                                //
// ========================================================================== //
// Intro Component
// Structure Component
// Section Component
// Table Component
// Cell Component
// Row Component
// Message Component
// References Component
// Reference Component
// Steps Component
// Step Component
const ids = ["Intro", "Structure", "Section", "Table", "Row", "Cell", "Message", "References", "Reference", "Steps", "Step"];
for (const id of ids) {
	somcheat_mapper.register(id, ({ args, content }) => {
		const element = tag(id);
		switch (id) {
			case "Message":
				element.props([{ __type__: "string", type: safeArg(args, 0, "type", null, null, "note") }]);
				break;
			case "Reference":
				element.props([
					{
						__type__: "string",
						title: safeArg(args, null, "title", null, null, "-")
					},
					{
						__type__: "string",
						url: safeArg(args, null, "url", null, null, "#")
					}
				]);
				break;
			case "Steps":
				element.props([
					{
						__type__: "string",
						title: safeArg(args, null, "title", null, null, "")
					}
				]);
				break;
			case "Step":
				element.props([
					{
						__type__: "string",
						title: safeArg(args, null, "title", null, null, "")
					}
				]);
				break;
		}
		return element.body(content);
	}, {type: "Block"});
}
// Table Header
somcheat_mapper.register("Headers", ({ content }) => {
	return tag("TableHeader").body(content);
}, {type: "Block"});
// Header
somcheat_mapper.register("Header", ({ content }) => {
	return tag("Header").body(content);
}, {type: "Block"});
// Table body
somcheat_mapper.register("Body", ({ content }) => {
	return tag("TableBody").body(content);
}, {type: "Block"});
// Code Component
somcheat_mapper.register(
	"Code",
	({ args, content }) => {
		const lang = safeArg(args, 0, "lang", null, null, "text");
		return tag("Code")
			.props([
				{
					__type__: "string",
					filename: safeArg(args, 1, "filename", null, null, "")
				}
			])
			.body("\n```" + lang + "" + content.trim() + "```\n");
	},
	{ escape: false, type: ["Block", "AtBlock"] }
);
//  Image Component
somcheat_mapper.register("Image", ({ args, content }) => {
	return tag("ImageComponent")
		.props([
			{
				__type__: "string",
				src: safeArg(args, null, "src", null, null, "")
			},
			{
				__type__: "string",
				alt: safeArg(args, null, "alt", null, null, "")
			},
			{
				__type__: "string",
				parentClass: safeArg(args, null, "parentClass", null, null, "flex items-center justify-center flex-col")
			},
			{
				__type__: "string",
				caption: safeArg(args, null, "caption", null, null, "")
			}
		])
		.body(content);
}, {type: "Block"});
// Inline Style
somcheat_mapper.register("style", ({ args, content }) => {
	let style = safeArg(args, 0, null, null, null, "");
	if (style.includes("somcheat_blue")) {
		style = style.replace("somcheat_blue", "#2a7dfd");
	}
	return tag("span")
		.props([
			{
				__type__: "string",
				style
			}
		])
		.body(content);
}, {type: "Inline"});

export default somcheat_mapper;
