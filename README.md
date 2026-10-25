# Company Portal + QR code

One QR code opens a page listing **Sadaf Group, Taj Al Najaar and Taj Asphalt**. Tapping a company shows its one-page profile in English, Arabic or Turkish, chosen with the switch at the top of every page.

## 1. Add the profile images

Put 9 images in the `profiles` folder with exactly these names (or change the paths in `companies.js`):

| Company | English | Arabic | Turkish |
|---|---|---|---|
| Sadaf Group | `sadaf-en.jpg` | `sadaf-ar.jpg` | `sadaf-tr.jpg` |
| Taj Al Najaar | `taj-alnajaar-en.jpg` | `taj-alnajaar-ar.jpg` | `taj-alnajaar-tr.jpg` |
| Taj Asphalt | `taj-asphalt-en.jpg` | `taj-asphalt-ar.jpg` | `taj-asphalt-tr.jpg` |

Tip: keep each image under ~1 MB (around 1500 px wide) so it opens fast on mobile data.

Optional: add phone / WhatsApp / email / website for each company in `companies.js`.

## 2. Publish for free

### Option A: GitHub Pages
1. Create a free account at github.com, then **New repository** → name it e.g. `companies` → **Public** → Create.
2. **Add file → Upload files** → drag in everything from this folder → **Commit changes**.
3. **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → **Save**.
4. After 1–2 minutes the site is live at `https://YOUR-USERNAME.github.io/companies/`.

### Option B: Vercel
1. Do steps 1–2 above to get the files on GitHub.
2. Sign in at vercel.com with GitHub → **Add New → Project** → import the repository → Framework Preset: **Other** → **Deploy**.
3. The site is live at `https://companies-xxxx.vercel.app` (you can rename it under Settings → Domains).

To update content later: upload the changed files to the same repository. The site updates by itself and **the QR code stays the same**.

## 3. Make the QR code

Open `https://YOUR-SITE/qr.html` on the live site. It already contains the site address. Click **Download SVG** for printing (or PNG for screens and social media). Scan it with a phone before printing.

> Do not use a QR made on your own computer (`localhost`); it only works on that machine.

## Preview locally

```
python serve.py
```
Then open http://localhost:8080. (This server makes the browser re-check files, so your edits show up on a normal refresh.)
