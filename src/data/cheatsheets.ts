import type CheatsheetType from "../types/cheatsheet";

interface MdxFrontmatter {
    title: string;
    category: string;
    layout?: string;
    lastModified?: string;
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
            cheatsheets.push({
                id,
                title: mod.frontmatter.title || id,
                category: mod.frontmatter.category || "Other",
                lastModified: mod.frontmatter.lastModified
            });
        }
    }
    return cheatsheets;
}
