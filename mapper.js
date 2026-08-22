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

  const html = (await codeToHtml(content.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })).replace(/<span class="line"><\/span>\s*<\/code>/, "</code>");

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

export default mapper;