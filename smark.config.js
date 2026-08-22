import { getMetadata, getHeadings, glob } from "sommark-web/variables";
import mapper from "./mapper.js";

async function getCheatsheets() {
  const files = await glob("src/pages/cheatsheet/**/*.smark");
  const cheatsheets = files.filter(f => !f.filePath.endsWith("index.smark"));

  const taskPaths = await fileHandler.glob("src/tasks/*.json");
  const taskFiles = await Promise.all(
    taskPaths.map(async (p) => ({ path: p, data: JSON.parse(await fileHandler.read(p)) }))
  );

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  let defaultIconHtml = null;
  try {
    const defaultSrc = await fileHandler.read('src/icons/book.smark');
    defaultIconHtml = await Smark.compile(defaultSrc, { format: 'html' });
  } catch {}

  const sheets = (await Promise.all(cheatsheets.map(async file => {
    try {
      const parts = file.filePath.replace(/\\/g, "/").split("/");
      const cheatsheetIdx = parts.indexOf("cheatsheet");
      const category = cheatsheetIdx >= 0 ? parts[cheatsheetIdx + 1] : "other";

      const taskEntry = taskFiles.find(
        t => t.data.title.toLowerCase() === file.title.toLowerCase()
      );
      const taskData = taskEntry?.data;

      let progress = 0;
      let tasks = 0;
      let finishedTasks = 0;
      let unfinishedTasks = 0;
      let taskFileLastModified = null;
      let taskList = [];
      if (taskData && taskData.tasks.length > 0) {
        const headingTexts = file.headings.map(h => h.text.toLowerCase());
        tasks = taskData.tasks.length;
        finishedTasks = taskData.tasks.filter(t => headingTexts.includes(t.toLowerCase())).length;
        unfinishedTasks = tasks - finishedTasks;
        progress = Math.round((finishedTasks / tasks) * 100);
        taskList = taskData.tasks.map(t => ({ name: t, done: headingTexts.includes(t.toLowerCase()) }));
        try {
          const ts = await fileHandler.lastModified(taskEntry.path);
          const td = new Date(ts);
          taskFileLastModified = `${months[td.getMonth()]} ${td.getDate()}, ${td.getFullYear()}`;
        } catch {}
      }

      const iconPath = file.metadata?.icon;
      let iconHtml = defaultIconHtml;
      if (iconPath) {
        try {
          const src = await fileHandler.read(iconPath);
          iconHtml = await Smark.compile(src, { format: 'html' });
        } catch {}
      }
      const abbr = (file.title || '').slice(0, 2).toUpperCase() || '??';

      const circ = 251.33; // 2 * PI * 40 (r=40 in 100x100 viewBox)
      const filled = (progress / 100 * circ).toFixed(2);
      const progressDash = `${filled} ${circ}`;
      const progressColor = progress === 100 ? '#10b981' : progress === 0 ? '#f43f5e' : '#3b82f6';
      const barColor = progress === 100 ? '#10b981' : progress === 0 ? '#f43f5e' : '#34d399';
      const barStyle = `background:${barColor};width:${progress}%`;

      const d = new Date(file.lastUpdate);
      const formattedDate = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

      const aliases = Array.isArray(file.metadata?.aliases) ? file.metadata.aliases : [];

      return { title: file.title || file.filePath, url: file.url, category, progress, abbr, iconHtml, progressDash, progressColor, barStyle, formattedDate, aliases, tasks, finishedTasks, unfinishedTasks, taskFileLastModified, taskList };
    } catch {
      return null;
    }
  }))).filter(s => s !== null);

  const categoryIcons = {
    languages:  '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    databases:  '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    frameworks: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    libraries:  '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    platforms:  '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    devtools:   '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    runtimes:   '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    other:      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',
  };

  const categoryNames = {
    languages: 'Languages', databases: 'Databases', frameworks: 'Frameworks',
    libraries: 'Libraries', platforms: 'Platforms', devtools: 'DevTools',
    runtimes: 'Runtimes', other: 'Other',
  };

  const defaultIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>';

  const grouped = {};
  for (const sheet of sheets) {
    if (!grouped[sheet.category]) grouped[sheet.category] = [];
    grouped[sheet.category].push(sheet);
  }

  return Object.keys(categoryNames).map(key => ({
    name: categoryNames[key],
    key,
    count: (grouped[key] || []).length,
    iconSvg: categoryIcons[key] || defaultIcon,
    sheets: grouped[key] || [],
  }));
}

async function getSearchIndexByCategory(category) {
  const categories = await getCheatsheets();
  const cat = categories.find(c => c.key === category);
  const sheets = (cat?.sheets || []).map(s => ({ title: s.title, iconHtml: s.iconHtml || '', url: s.url, aliases: s.aliases || [] }));
  return JSON.stringify(sheets);
}

async function getSearchIndex() {
  const categories = await getCheatsheets();
  const sheets = categories.flatMap(c =>
    c.sheets.map(s => ({ title: s.title, iconHtml: s.iconHtml || '', url: s.url, aliases: s.aliases || [] }))
  );
  return JSON.stringify(sheets);
}

export default {
  mapperFile: mapper,
  variables: {
    __pagesDir: "src/pages",
    glob,
    getMetadata,
    getHeadings,
    getCheatsheets,
    getSearchIndex,
    getSearchIndexByCategory,
  },
}
