import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.resolve(__dirname, '../pages');
const METADATA_FILE = path.resolve(__dirname, '../../data/metadata.json');

function getGitInfo(filePath) {
    try {
        const cmd = `git log -1 --pretty=format:"%aI|%an|%H" -- "${filePath}"`;
        const output = execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();

        if (!output) return null;

        const [date, author, hash] = output.split('|');
        return {
            lastUpdated: date,
            updatedBy: author,
            hash: hash
        };
    } catch (e) {
        /* 
        [Fallback]: to file system stats if git fails 
        */
        try {
            const stats = fs.statSync(filePath);
            return {
                lastUpdated: stats.mtime.toISOString(),
                updatedBy: 'Unknown',
                hash: 'local-fs'
            };
        } catch (fsError) {
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
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function main() {
    console.log('Starting metadata fetch (Local Git Mode)...');

    const files = findFiles(PAGES_DIR);
    const metadata = {};
    let updatedCount = 0;

    for (const file of files) {
        const relativePath = path.relative(path.resolve(__dirname, '..'), file);
        const key = relativePath;

        const info = getGitInfo(file);

        if (info) {
            metadata[key] = {
                lastUpdated: info.lastUpdated,
                updatedBy: info.updatedBy,
                hash: info.hash,
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
