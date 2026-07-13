import { getMetadata, getHeadings, glob } from "sommark-web/variables";
import { HTML } from "sommark";
import { codeToHtml } from "shiki";

const mapper = HTML.clone();

mapper.register("Table", function ({ content }) {
  return `<div class="ck-table-wrap">${this.tag("table").attributes({ class: "ck-table" }).body(content)}</div>`;
});

mapper.register("THeader", function ({ content }) {
  return this.tag("thead").attributes({ class: "ck-table-head" }).body(content);
});

mapper.register("TBody", function ({ content }) {
  return this.tag("tbody").attributes({ class: "ck-table-body" }).body(content);
});

mapper.register("Row", function ({ content }) {
  return this.tag("tr").attributes({ class: "ck-table-row" }).body(content);
});

mapper.register("Cell", function ({ content, props, isSelfClosing }) {
  const val = isSelfClosing ? (props["0"] ?? "") : content;
  return this.tag("td").attributes({ class: "ck-table-td" }).body(val);
}, { escape: false });

const _alertIcons = {
  note: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  tip: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,
  warning: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  error: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  important: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

const _alertTitles = {
  note: "Note", tip: "Tip", warning: "Warning", error: "Error", important: "Important",
};

mapper.register(["Alert", "alert"], function ({ content, directives }) {
  const type = directives["type"] || "note";
  const icon = _alertIcons[type] ?? _alertIcons.note;
  const title = _alertTitles[type] ?? "Note";

  const titleEl = this.tag("span").attributes({ class: "ck-alert-title" }).body(title);
  const header  = this.tag("div").attributes({ class: "ck-alert-header" }).body(icon + titleEl);
  const body    = this.tag("div").attributes({ class: "ck-alert-body" }).body(content);

  return this.tag("div").attributes({ class: `ck-alert ck-alert--${type}` }).body(header + body);
}, { escape: false });

const _codeIcons = {
  copy:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  check: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
};

mapper.register(["Code", "code"], async function ({ content, props }) {
  const lang   = props["lang"] ?? props["0"] ?? "text";
  const showLn = props["line-number"] !== false && props["line-number"] !== "false";

  const html = await codeToHtml(content.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });

  const fileEl  = props["file"]
    ? this.tag("span").attributes({ class: "ck-code-file" }).body(props["file"])
    : "";
  const copyBtn = this.tag("button")
    .attributes({ class: "ck-code-copy", "aria-label": "Copy" })
    .body(
      this.tag("span").attributes({ class: "ck-cc-copy" }).body(_codeIcons.copy) +
      this.tag("span").attributes({ class: "ck-cc-done" }).body(_codeIcons.check)
    );
  const header  = this.tag("div").attributes({ class: "ck-code-header" }).body(fileEl + copyBtn);

  const cls = "ck-code" + (showLn ? " ck-code--ln" : "");
  return this.tag("div").attributes({ class: cls }).body(header + html);
}, { escape: false });

mapper.register("Steps", function ({ content }) {
  return this.tag("ol").attributes({ class: "ck-steps" }).body(content);
});

mapper.register("Step", function ({ content, props }) {
  const title     = props["title"] ?? "";
  const markerEl  = this.tag("div").attributes({ class: "ck-step-marker" }).body("");
  const lineEl    = this.tag("div").attributes({ class: "ck-step-line" }).body("");
  const trackEl   = this.tag("div").attributes({ class: "ck-step-track" }).body(markerEl + lineEl);
  const titleEl   = this.tag("div").attributes({ class: "ck-step-title" }).body(title);
  const bodyEl    = this.tag("div").attributes({ class: "ck-step-body" }).body(content);
  const contentEl = this.tag("div").attributes({ class: "ck-step-content" }).body(titleEl + bodyEl);
  return this.tag("li").attributes({ class: "ck-step" }).body(trackEl + contentEl);
}, { escape: false });

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
