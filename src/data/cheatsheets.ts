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

const modules = import.meta.glob<MdxModule>('../pages/cheatsheets/*.mdx', { eager: true });

export interface SimpleCheatsheet {
    id: string;
    title: string;
    category: string;
    lastModified?: string;
}

export function getAllCheatsheets(): SimpleCheatsheet[] {
    const cheatsheets: SimpleCheatsheet[] = [];

    for (const path in modules) {
        const mod = modules[path];
        const filename = path.split('/').pop() || "";
        const id = filename.replace('.mdx', '');

        if (id && id !== 'index') {
            const metadataKey = `src/pages/cheatsheets/${id}.mdx`;
            // @ts-ignore
            const dateStr = metadata[metadataKey]?.lastUpdated;
            const lastModified = dateStr ? formatDate(dateStr) : "Unknown";

            cheatsheets.push({
                id,
                title: mod.frontmatter.title || id,
                category: mod.frontmatter.category || "Other",
                lastModified: lastModified
            });
        }
    }
    return cheatsheets;
}
