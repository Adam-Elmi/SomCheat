(() => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest("#copy-btn, .copy-btn") as HTMLButtonElement;

    if (!btn) return;

    if (btn.dataset.copyType === "image") {
      const src = btn.dataset.src;
      if (!src) return;

      fetch(src)
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            copyToClipboard(base64data, btn);
          };
          reader.readAsDataURL(blob);
        })
        .catch(err => {
          fetch(`/api/image-proxy?url=${encodeURIComponent(src)}`)
            .then(res => {
              if (!res.ok) throw new Error("Proxy fetch failed");
              return res.blob();
            })
            .then(blob => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64data = reader.result as string;
                copyToClipboard(base64data, btn);
              };
              reader.readAsDataURL(blob);
            })
            .catch(proxyErr => console.error("Failed to copy image via proxy", proxyErr));
        });
      return;
    }

    const container = btn.closest(".code-block-container, .code-tabs-group");
    if (!container) return;

    let codeElement: HTMLElement | null = null;

    if (container.classList.contains("code-tabs-group")) {
      const visibleTab = container.querySelector(".code-tab:not(.hidden)");
      if (visibleTab) {
        codeElement = visibleTab.querySelector("pre, code");
        if (!codeElement) codeElement = visibleTab as HTMLElement;
      }
    } else {
      codeElement = container.querySelector("pre, code, #code-block-container") as HTMLElement;
    }

    if (!codeElement) return;

    const textToCopy = codeElement.innerText;
    copyToClipboard(textToCopy, btn);
  });

  function copyToClipboard(text: string, btn: HTMLButtonElement) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showFeedback(btn);
      }).catch(err => {
        console.error("Failed to copy!", err);
        fallbackCopy(text, btn);
      });
    } else {
      fallbackCopy(text, btn);
    }
  }

  function showFeedback(btn: HTMLButtonElement) {
    const tooltip = btn.querySelector("span[class*='absolute']");
    if (tooltip) {
      const originalText = tooltip.textContent || "Copy";
      tooltip.textContent = "Copied!";
      tooltip.classList.add("!opacity-100", "!text-emerald-400");
      setTimeout(() => {
        tooltip.textContent = originalText;
        tooltip.classList.remove("!opacity-100", "!text-emerald-400");
      }, 2000);
    }

    const iconSpan = btn.querySelector("span[class*='text-[#8b949e]']");
    if (iconSpan) {
      iconSpan.classList.add("text-emerald-500");
      setTimeout(() => iconSpan.classList.remove("text-emerald-500"), 2000);
    }

    const svg = btn.querySelector("svg");
    if (svg && !iconSpan) {
      const originalColor = svg.getAttribute("class") || "";
      svg.setAttribute("class", originalColor.replace("text-slate-500", "text-emerald-500").replace("dark:text-slate-400", "dark:text-emerald-400") + " text-emerald-500");
      setTimeout(() => {
        svg.setAttribute("class", originalColor);
      }, 2000);
    }
  }

  function fallbackCopy(text: string, btn: HTMLButtonElement) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      showFeedback(btn);
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
    document.body.removeChild(textArea);
  }
})();