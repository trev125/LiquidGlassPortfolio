# trevor allen · personal site

A one-page portfolio styled as an app's release notes. It's plain HTML and CSS on top of [Puppertino 2.0.0](https://puppertino.com/docs/foundations/), loaded from jsDelivr. There's no build step.

```
site/            # Everything that gets deployed
  index.html     # All content
  styles.css     # Layout on top of Puppertino tokens
  theme.js       # Dark mode toggle (system by default, saved choice in localStorage)
  app.js         # Tab bar selection on scroll
  icons/         # Skill tiles for the Dock (Simple Icons, CC0)
  favicon.svg
```

## Editing

- **New project:** copy a `<details class="release">` block in `index.html` and bump the version number. Set `data-area` to any of `web`, `mobile`, `backend` so the filter picks it up.
- **New role:** add a `<div class="role">` with an `<h3 class="major">` heading and a dates line, then its releases.
- **New skill:** add a 144px square SVG to `icons/` and a `<span class="p-dock-item">` in the Compatibility Dock. The `aria-label` is the hover label.
- **New tab:** add a section with an `id` and a matching `.p-tab-bar__tab` link. Keep it to five tabs or fewer.
- **What's New:** update the card and the version label to match the newest release.
- Colors come from Puppertino tokens (`--p-text-*`, `--p-bg-grouped-*`, `--p-sys-*`). Use those instead of hex values so dark mode keeps working.

## Glass

The tab bar and the dark mode button use Puppertino's CSS glass material (blur plus the glass edge). Real-time Puppertino Glass (`glass.js` with Glassworks) was tried and removed. It retakes a full-page snapshot whenever the page height changes, which hid the bar for about half a second and froze the page on every filter click or expanded release.

To preview locally, open `site/index.html` in a browser. No server is needed.

## Deploying with a Porkbun domain

Only publish the `site/` folder. Either option works:

1. **Porkbun static hosting:** connect the GitHub repo in Porkbun's static hosting settings and set the publish directory to `site/`.
2. **GitHub Pages:** publish `site/` through a Pages workflow, then add the GitHub Pages `A` records (plus a `CNAME` for `www`) in Porkbun DNS, and set the custom domain in the repo's Pages settings.
