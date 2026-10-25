// Shared by index.html and company.html: language choice + switcher.
const LANGS = Object.keys(UI);

// ?lang= in the URL wins, then the visitor's last choice, then the default (first) language.
function currentLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(q)) return q;
  try {
    const saved = localStorage.getItem("lang");
    if (LANGS.includes(saved)) return saved;
  } catch {}
  return LANGS[0];
}

// Calls render(lang, text) now and after every switch, then fills every .lang switcher on the page.
function startPage(render) {
  const apply = lang => {
    document.documentElement.lang = lang;
    document.documentElement.dir = UI[lang].dir;
    const footer = document.getElementById("footer");
    if (footer) footer.textContent = `© ${new Date().getFullYear()} · ${COMPANIES.map(c => c.name[lang]).join(" · ")}`;
    render(lang, UI[lang]);
    // After render, so switchers that render() just created get their buttons too.
    const buttons = LANGS.map(l =>
      `<button type="button" lang="${l}" data-lang="${l}" aria-pressed="${l === lang}">${UI[l].label}</button>`).join("");
    document.querySelectorAll(".lang").forEach(box => box.innerHTML = buttons);
  };
  document.addEventListener("click", e => {
    const lang = e.target.closest(".lang button")?.dataset.lang;
    if (!lang) return;
    try { localStorage.setItem("lang", lang); } catch {}
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    apply(lang);
  });
  apply(currentLang());
}
