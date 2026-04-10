# Grantura Write

**Privacy-first reference manager and AI manuscript generator for researchers.**

Part of the [Grantura](https://github.com/YOUR_USERNAME/grantura) browser extension family.

---

## What Grantura Write does

- **Captures references** from any journal website, PubMed, Google Scholar, Scopus, arXiv — one click while reading a paper
- **Manages your library** — search, tag, annotate, flag weak citations, export XML/BibTeX
- **Generates manuscripts** grounded entirely in your selected references — no AI hallucination
- **Inline editor** — edit the generated manuscript, review citations, download as .docx / PDF / XML

---

## Repository structure

```
grantura-write/
├── manifest.json           ← Firefox extension manifest (Manifest V2)
├── background/
│   ├── background.js       ← Service worker: storage, messaging, notifications
│   └── content.js          ← Injected on journal pages: extracts paper metadata
├── popup/
│   └── popup.html          ← Toolbar button popup: capture reference from current page
├── sidebar/
│   └── sidebar.html        ← Full Grantura Write app: library + editor + generator
├── icons/
│   ├── icon-48.png         ← You must add this (48×48 px)
│   ├── icon-96.png         ← You must add this (96×96 px)
│   └── icon-128.png        ← You must add this (128×128 px)
└── docs/
    └── SCREENSHOT.png      ← Add screenshot for Mozilla Add-ons listing
```

---

## How to upload to GitHub

### Step 1 — Create the repository

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `grantura-write`
3. Description: `Privacy-first reference manager and AI manuscript generator for researchers`
4. Set to **Public** (required for Mozilla Add-ons review)
5. Check **Add a README file** — NO (you already have this one)
6. Click **Create repository**

### Step 2 — Upload the files

**Option A — GitHub web interface (easiest):**

1. Open your new repository on GitHub
2. Click **Add file → Upload files**
3. Drag and drop the entire `grantura-write/` folder
4. Keep the folder structure exactly as shown above
5. Commit message: `Initial release — Grantura Write v1.0.0`
6. Click **Commit changes**

**Option B — Git command line:**

```bash
cd grantura-write
git init
git add .
git commit -m "Initial release — Grantura Write v1.0.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/grantura-write.git
git push -u origin main
```

### Step 3 — Add your icons

Before uploading, create PNG icons at these sizes and place them in `icons/`:
- `icon-48.png`  — 48 × 48 pixels
- `icon-96.png`  — 96 × 96 pixels  
- `icon-128.png` — 128 × 128 pixels

Free tool to create icons: [https://favicon.io](https://favicon.io) or use your existing Grantura icon resized.

### Step 4 — Create a release (for .xpi download)

1. On GitHub, click **Releases → Create a new release**
2. Tag version: `v1.0.0`
3. Title: `Grantura Write v1.0.0 — Initial release`
4. Zip the extension folder and attach as a release asset
5. Click **Publish release**

---

## How to submit to Mozilla Add-ons (AMO)

1. Go to [https://addons.mozilla.org/developers/](https://addons.mozilla.org/developers/)
2. Click **Submit a New Add-on**
3. Choose **On this site** (hosted by Mozilla)
4. Zip your extension folder: `zip -r grantura-write.zip grantura-write/`
5. Upload the zip
6. Fill in listing details:
   - **Name:** Grantura Write
   - **Summary:** Privacy-first reference manager and AI manuscript generator for researchers
   - **Description:** (see below)
   - **Categories:** Productivity, Research & Tools
   - **Homepage:** your GitHub URL
7. Submit for review (usually 1–7 days)

### Suggested Mozilla listing description

```
Grantura Write is a privacy-first reference manager built for researchers.

CAPTURE references with one click while reading any paper on PubMed, 
Google Scholar, The Lancet, Nature, arXiv, and 15+ major journal sites. 
Metadata is detected automatically.

MANAGE your library — search, annotate, flag weak citations, export as 
XML or BibTeX compatible with Zotero and Mendeley.

GENERATE manuscripts grounded entirely in your selected references. 
Every scientific sentence is linked to a real paper you chose — 
no hallucination by design.

Your data never leaves your browser. Grantura Write uses your own 
Groq or Google Gemini API key — no data collection, no cloud storage.
```

---

## How to connect with the existing Grantura extension

If you already have Grantura (Grant Form Filler) installed, Grantura Write 
is a separate extension that lives in the sidebar. Both extensions share the 
same Grantura brand but are independent — researchers can install one or both.

Future versions may merge both into a single extension with:
- **Popup** → Grant Form Filler (existing)
- **Sidebar** → Grantura Write (this extension)

---

## Local testing in Firefox

1. Open Firefox
2. Go to `about:debugging`
3. Click **This Firefox → Load Temporary Add-on**
4. Navigate to your `grantura-write/` folder
5. Select `manifest.json`
6. The extension loads — click the Grantura Write icon in the toolbar

---

## License

© 2026 Grantura. All rights reserved.

Released under the **GNU General Public License v3.0** — free to use, 
modify, and distribute, but derivative works must remain open source.

See [LICENSE](LICENSE) for full terms.

---

## Roadmap

- [ ] v1.1 — PDF full-text upload and parsing
- [ ] v1.2 — Batch DOI import
- [ ] v1.3 — Chrome and Edge support (Manifest V3)
- [ ] v1.4 — Offline AI via Ollama
- [ ] v2.0 — Merge with Grantura Grant Form Filler into one extension
