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

const CONTACT_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6"/></svg>`;

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
  // No download attribute: iPhone then opens the card straight into "Create New Contact".
  $("founder-save").href = f.vcard;
  $("founder-save").innerHTML = `${CONTACT_ICON} ${t.saveContact}`;
  if (!$("founder-save-status")) $("founder-save").after(Object.assign(document.createElement("p"),
    { id: "founder-save-status", className: "save-status", role: "status" }));
  $("founder-save-status").textContent = "";
  // Fetched ahead so share() runs inside the tap itself (browsers refuse it after a slow await).
  if (!IS_IOS && navigator.canShare && !vcfFetch) vcfFetch = fetch(f.vcard).then(r => r.blob())
    .then(b => { vcfFile = new File([b], f.vcard, { type: "text/vcard" }); }).catch(() => {});
  $("founder-full").href = f.poster;
  $("founder-full").innerHTML = `${t.fullMessage} <span class="arr" aria-hidden="true">→</span>`;
}

const IS_IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
let vcfFetch, vcfFile;

// Save contact: the share sheet where the browser can share a .vcf file, otherwise the plain link,
// which iPhone opens as "Create New Contact" and other browsers download. Saving always needs the visitor's OK.
document.addEventListener("click", e => {
  const btn = e.target.closest("#founder-save");
  if (!btn) return;
  const t = UI[document.documentElement.lang] || UI[LANGS[0]];
  const say = msg => { document.getElementById("founder-save-status").textContent = msg; };
  if (!IS_IOS && vcfFile && navigator.canShare({ files: [vcfFile] })) {
    e.preventDefault();
    say(t.saveShareOpen);
    navigator.share({ files: [vcfFile] }).then(() => say(t.saveShared), err => {
      if (err.name === "AbortError") return say(t.saveCancelled);
      say(t.saveFallback);
      location.href = btn.href; // share refused: fall back to the file
    });
    return;
  }
  say(IS_IOS ? t.saveIos : t.saveFallback);
});

// Tapping the QR opens a share dialog: the phone's own share sheet (AirDrop / Quick Share / WhatsApp…)
// or copy the link. Phone-to-phone NFC isn't available to websites on any platform.
const SHARE_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>`;

function setupQrShare(getUrl) {
  const text = () => UI[document.documentElement.lang] || UI[LANGS[0]];
  const qr = document.getElementById("qr");
  qr.tabIndex = 0;
  qr.setAttribute("role", "button");
  qr.setAttribute("aria-label", text().shareTitle);
  const hint = document.createElement("p");
  hint.className = "qr-hint";
  hint.innerHTML = `${SHARE_ICON}<span>${text().tapHint}</span>`;
  qr.closest(".qr-zone").after(hint);

  const dlg = document.createElement("dialog");
  dlg.className = "share-dialog";
  document.body.append(dlg);

  const open = () => {
    const t = text();
    dlg.innerHTML = `<div class="share-body">
      <h2>${t.shareTitle}</h2>
      ${navigator.share ? `<button class="btn btn-gold" data-act="share">${SHARE_ICON} ${t.share}</button>` : ""}
      <button class="btn btn-ghost" data-act="copy">${t.copy}</button>
      <p class="share-status" role="status"></p>
      ${navigator.share ? `<p class="share-note">${t.shareHint}</p>` : ""}
      <button class="share-close" data-act="close">${t.close}</button>
    </div>`;
    dlg.showModal();
  };
  qr.addEventListener("click", open);
  qr.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });

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
