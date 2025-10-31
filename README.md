# Crush Closet — Starter Site

A clean, responsive starter for a curated fashion blog that ships weekly edits called **Crushes of the Week**, filtered by **season**, **occasion**, and **budget**.

## Quick Start
1. Edit content in `content/picks.json` (add more items).
2. Open `index.html` locally, or deploy to Netlify / GitHub Pages.
3. Replace newsletter form with your provider (Buttondown, Mailchimp, Substack, Beehiiv, etc.).

## Deploy (Netlify)
- Drag this folder into Netlify; no build step needed.
- Netlify Forms will capture emails from the `<form>` as-is (check the Forms tab).

## Deploy (GitHub Pages)
- Create a repo, push files, enable Pages for the `main` branch.
- Access site at `https://<you>.github.io/<repo>/`.

## Customize
- Change brand name in `index.html` (title + header + footer).
- Color & font tweaks in `styles.css` variables.
- Dark/light mode toggles automatically and via header button.
- Add analytics (Plausible/GA4) by inserting your script in `index.html`.

## Content Schema (`content/picks.json`)
```json
{
  "items": [
    {
      "id": "unique-id",
      "title": "Item title",
      "brand": "Brand",
      "price": "$120",
      "budget": "Save | Mid | Splurge",
      "season": "Fall | Winter | Spring | Summer",
      "occasions": ["Everyday","Date Night","Travel", "..."],
      "color": "Camel",
      "desc": "Short description",
      "image": "https://...",
      "link": "https://your-affiliate-link",
      "alt": "https://alternate-link",
      "tags": ["coat","neutral"]
    }
  ]
}
```
