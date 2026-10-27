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

// Fills the founder block (same element ids on index.html and qr.html).
function renderFounder(lang, t) {
  const f = FOUNDER, $ = id => document.getElementById(id);
  $("founder-eyebrow").textContent = t.founderEyebrow;
  $("founder-photo").href = f.poster;
  $("founder-img").src = f.photo;
  $("founder-img").alt = f.name[lang];
  $("founder-sign").src = f.signature;
  $("founder-quote").innerHTML = f.quote[lang];
  $("founder-name").textContent = f.name[lang];
  $("founder-title").textContent = f.title[lang];
  $("founder-full").href = f.poster;
  $("founder-full").innerHTML = `${t.fullMessage} <span class="arr" aria-hidden="true">→</span>`;
}

// Tapping the QR opens a share dialog: write the link to an NFC tag (Web NFC: Chrome on Android only),
// the phone's own share sheet (Quick Share / AirDrop / WhatsApp…), or copy the link.
// Phone-to-phone NFC isn't available to websites on any platform, so a tag is the NFC route.
const NFC_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 8.5a5 5 0 0 1 0 7"/><path d="M11 6a9 9 0 0 1 0 12"/><path d="M15 3.5a13 13 0 0 1 0 17"/></svg>`;

function setupQrShare(getUrl) {
  const text = () => UI[document.documentElement.lang] || UI[LANGS[0]];
  const qr = document.getElementById("qr");
  qr.tabIndex = 0;
  qr.setAttribute("role", "button");
  qr.setAttribute("aria-label", text().shareTitle);
  const hint = document.createElement("p");
  hint.className = "qr-hint";
  hint.innerHTML = `${NFC_ICON}<span>${text().tapHint}</span>`;
  qr.closest(".qr-zone").after(hint);

  const dlg = document.createElement("dialog");
  dlg.className = "share-dialog";
  document.body.append(dlg);
  let abort;

  const open = () => {
    const t = text(), nfc = "NDEFReader" in window;
    dlg.innerHTML = `<div class="share-body">
      <h2>${t.shareTitle}</h2>
      ${nfc ? `<button class="btn btn-gold" data-act="nfc">${NFC_ICON} ${t.nfcWrite}</button>` : ""}
      ${navigator.share ? `<button class="btn btn-ghost" data-act="share">${t.share}</button>` : ""}
      <button class="btn btn-ghost" data-act="copy">${t.copy}</button>
      <p class="share-status" role="status"></p>
      ${nfc ? "" : `<p class="share-note">${t.nfcNote}</p>`}
      <button class="share-close" data-act="close">${t.close}</button>
    </div>`;
    dlg.showModal();
  };
  qr.addEventListener("click", open);
  qr.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  dlg.addEventListener("close", () => abort?.abort()); // stop waiting for a tag

  dlg.addEventListener("click", async e => {
    if (e.target === dlg) return dlg.close(); // backdrop
    const act = e.target.closest("button")?.dataset.act;
    if (!act) return;
    const t = text(), url = getUrl(), status = dlg.querySelector(".share-status");
    if (act === "close") dlg.close();
    if (act === "share") navigator.share({ title: document.title, url }).catch(() => {}); // cancel is fine
    if (act === "copy") {
      try { await navigator.clipboard.writeText(url); status.textContent = t.copied; }
      catch { status.textContent = url; } // clipboard blocked: show it to copy by hand
    }
    if (act === "nfc") {
      abort?.abort();
      abort = new AbortController();
      status.textContent = t.nfcWaiting;
      try {
        await new NDEFReader().write({ records: [{ recordType: "url", data: url }] }, { signal: abort.signal });
        status.textContent = t.nfcDone;
      } catch (err) {
        if (err.name !== "AbortError") status.textContent = t.nfcFail;
      }
    }
  });
}

// Calls render(lang, text) now and after every switch, then fills every .lang switcher on the page.
function startPage(render) {
  const apply = lang => {
    document.documentElement.lang = lang;
    document.documentElement.dir = UI[lang].dir;
    const footer = document.getElementById("footer");
    if (footer) footer.textContent = `© ${new Date().getFullYear()} · ${COMPANIES.map(c => c.name[lang]).join(" · ")}`;
    render(lang, UI[lang]);
    const hint = document.querySelector(".qr-hint span");
    if (hint) hint.textContent = UI[lang].tapHint;
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
