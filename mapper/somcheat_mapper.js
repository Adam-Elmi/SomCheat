import { MDX } from "sommark";
// Heading Block
const somcheat_mapper = MDX.clone();
["h1", "h2", "h3", "h4", "h5", "h6"].forEach(h => {
	somcheat_mapper.register(h, ({ args, content }) => {
		const format = somcheat_mapper.safeArg({ args, key: "format", fallBack: "" });
		if (format === "html") {
			return somcheat_mapper.tag(h).jsxProps(args).body(content);
		}
		return somcheat_mapper.md.heading(content, h.slice(1));
	});
});
// Frontmatter Block
somcheat_mapper.register(
	["Frontmatter", "frontmatter"],
	({ args, content }) => {
		let entries = "";
		for (const [key, value] of Object.entries(args)) {
			if (isNaN(Number(key))) {
				entries += `${key}: ${value}\n`;
			}
		}
		let frontmatter_container = `---\n${entries}---`;
		return frontmatter_container;
	},
	{
		type: "Block"
	}
);
// Code Block
somcheat_mapper.register(
	["Code", "code"],
	function ({ args, content }) {
		const lang = this.safeArg({ args, key: "lang", index: 0, fallBack: "text" });
		const filename = this.safeArg({ args, key: "filename" });
		let code = this.md.codeBlock(content, lang) + "\n";
		const element = this.tag("Code");
		if (filename) {
			element.attributes({ filename });
		}
		return element.body(code);
	},
	{ resolve: true, escape: false }
);
// Remove MDX registered output
somcheat_mapper.removeOutput("Table");
somcheat_mapper.removeOutput("row");
somcheat_mapper.removeOutput("cell");
somcheat_mapper.removeOutput("header");
somcheat_mapper.removeOutput("body");

export default somcheat_mapper;
