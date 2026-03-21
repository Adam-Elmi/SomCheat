import metadata from "../../data/metadata.json";
import { formatDate } from "../utils/formatDate";

interface MdxFrontmatter {
	title: string;
	category: string;
	layout?: string;
}

interface MdxModule {
	frontmatter: MdxFrontmatter;
	url: string;
}

const languages_module = import.meta.glob<MdxModule>("../pages/cheatsheets/languages/*.mdx", { eager: true });
const databases_module = import.meta.glob<MdxModule>("../pages/cheatsheets/databases/*.mdx", { eager: true });
const frameworks_module = import.meta.glob<MdxModule>("../pages/cheatsheets/frameworks/*.mdx", { eager: true });
const libraries_module = import.meta.glob<MdxModule>("../pages/cheatsheets/libraries/*.mdx", { eager: true });
const platforms_module = import.meta.glob<MdxModule>("../pages/cheatsheets/platforms/*.mdx", { eager: true });
const devTools_module = import.meta.glob<MdxModule>("../pages/cheatsheets/dev-tools/*.mdx", { eager: true });
const other_module = import.meta.glob<MdxModule>("../pages/cheatsheets/other/*.mdx", { eager: true });

const modules = [
	languages_module,
	databases_module,
	frameworks_module,
	libraries_module,
	platforms_module,
	devTools_module,
	other_module
];
export interface SimpleCheatsheet {
  id: string;
  path: string;
	title: string;
	category: string;
	lastModified?: string;
}

export function getAllCheatsheets(): SimpleCheatsheet[] {
	const cheatsheets: SimpleCheatsheet[] = [];

	for (const module of modules) {
		for (const path in module) {
			const mod = module[path];
			const filename = path.split("/").pop() || "";
			const id = filename.replace(".mdx", "");

			if (id && id !== "index") {
        const metadataKey = `src/pages${mod.url}.mdx`;
				// @ts-ignore
				const dateStr = metadata[metadataKey]?.lastUpdated;
        const lastModified = dateStr ? formatDate(dateStr) : "Unknown";

				cheatsheets.push({
          id,
					path:mod.url,
					title: mod.frontmatter.title || id,
					category: mod.frontmatter.category || "Other",
					lastModified: lastModified
				});
			}
		}
	}
	return cheatsheets;
}
