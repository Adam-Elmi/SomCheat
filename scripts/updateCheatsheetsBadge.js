import fs from 'fs';
import path from 'path';

const cheatsheetsDir = path.join(process.cwd(), 'src/pages/cheatsheet');
const readmePath = path.join(process.cwd(), 'README.md');

function countSmarkFiles(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countSmarkFiles(path.join(dir, entry.name));
    } else if (entry.name.endsWith('.smark') && entry.name !== 'index.smark') {
      count++;
    }
  }
  return count;
}

const total = countSmarkFiles(cheatsheetsDir);

let readme = fs.readFileSync(readmePath, 'utf-8');
readme = readme.replace(
  /(!\[Cheatsheets Available\]\(https:\/\/img\.shields\.io\/badge\/Cheatsheets-)\d+(-blue\.svg\))/,
  `$1${total}$2`
);
fs.writeFileSync(readmePath, readme);

console.log(`Updated cheatsheets badge to ${total}`);
