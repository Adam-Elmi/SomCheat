import fs from 'fs';
import path from 'path';

const cheatsheetsDir = path.join(process.cwd(), 'src/pages/cheatsheets');

const readmePath = path.join(process.cwd(), 'README.md');

const files = fs.readdirSync(cheatsheetsDir).filter(file => {
  return fs.statSync(path.join(cheatsheetsDir, file)).isFile();
});

const totalCheatsheets = files.length;

let readmeContent = fs.readFileSync(readmePath, 'utf-8');

readmeContent = readmeContent.replace(
  /(!\[Cheatsheets Available\]\(https:\/\/img\.shields\.io\/badge\/Cheatsheets-)\d+(-blue\.svg\))/,
  `$1${totalCheatsheets}$2`
);

fs.writeFileSync(readmePath, readmeContent);

console.log(`Updated cheatsheets badge to ${totalCheatsheets}`);
