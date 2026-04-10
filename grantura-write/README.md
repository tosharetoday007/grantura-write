# Grantura Write

**Privacy-first reference manager and AI manuscript generator — Firefox extension**

> Capture references from any journal with one click. Build your library. Generate a manuscript grounded in real papers you selected — no hallucination.

---

## Install

- **Firefox:** [Mozilla Add-ons page](https://addons.mozilla.org) *(submit pending)*
- **Manual install:** Download latest release → `about:debugging` → Load Temporary Add-on → select `manifest.json`

---

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest |
| `background/background.js` | Storage, messaging, notifications |
| `background/content.js` | Metadata extraction from journal pages |
| `popup/popup.html` | Reference capture popup (toolbar button) |
| `sidebar/sidebar.html` | Full app — library, editor, generator |
| `icons/` | Extension icons (48, 96, 128 px) |

---

## Quick start for developers

```bash
git clone https://github.com/YOUR_USERNAME/grantura-write.git
# Open Firefox → about:debugging → Load Temporary Add-on → manifest.json
```

See [`docs/README.md`](docs/README.md) for full setup, GitHub upload steps, and Mozilla submission guide.

---

## License

GNU GPL v3.0 — © 2026 Grantura
