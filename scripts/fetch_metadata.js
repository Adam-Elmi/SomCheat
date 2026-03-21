import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const categories = ["languages", "databases", "frameworks", "libraries", "platforms", "runtimes", "devtools", "other"];
const PAGES_DIR = path.resolve(__dirname, "../src/pages/");
const METADATA_FILE = path.resolve(__dirname, "../data/metadata.json");

function getGitInfo(filePath) {
    try {
        const absoluteFilePath = path.resolve(filePath);
        
        const cmd = `git --no-pager log -1 --pretty=format:"%aI|%an|%H" -- "${absoluteFilePath}"`;
        
        const output = execSync(cmd, { 
            encoding: "utf-8", 
            stdio: ["pipe", "pipe", "pipe"] 
        }).trim();

        if (!output) {
            throw new Error("Untracked file: No Git history found.");
        }

        const [date, author, hash] = output.split("|");
        return {
            lastUpdated: date,
            updatedBy: author,
            hash: hash
        };
        
    } catch (e) {
        /*
        [Fallback]: to file system stats if git fails OR file is untracked
        */
        try {
            const absoluteFilePath = path.resolve(filePath);
            const stats = fs.statSync(absoluteFilePath);
            
            return {
                lastUpdated: stats.mtime.toISOString(),
                updatedBy: "Local Dev", 
                hash: "untracked"
            };
        } catch (fsError) {
            console.error(`[SomCheat Builder] Failed to resolve file: ${filePath}`);
            return null;
        }
    }
}

function findFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir);
	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			findFiles(filePath, fileList);
		} else if (file.endsWith(".md") || file.endsWith(".mdx")) {
			fileList.push(filePath);
		}
	}
	return fileList;
}

function main() {
  console.log("Starting metadata fetch (Local Git Mode)...");

  let files = [];
  for (const category of categories) {
    const category_path = path.join(PAGES_DIR, "cheatsheets", category);
    const category_files = findFiles(category_path);
    files.push(category_files)
  }
  files = files.flat();
	const metadata = {};
	let updatedCount = 0;

	for (const file of files) {
		const relativePath = path.relative(path.resolve(__dirname, ".."), file);
		const key = relativePath;

		const info = getGitInfo(file);
  // console.log(relativePath);

		if (info) {
			metadata[key] = {
				lastUpdated: info.lastUpdated,
				updatedBy: info.updatedBy,
				hash: info.hash
			};
			updatedCount++;
		}
	}

	fs.mkdirSync(path.dirname(METADATA_FILE), { recursive: true });
	fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));

	console.log(`Metadata saved to ${METADATA_FILE}`);
	console.log(`Processed ${files.length} files. Updated metadata for ${updatedCount} files.`);
}

main();
