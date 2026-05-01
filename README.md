# Boomoji 🎈

A mobile-first PWA emoji toy for little kids. Tap. Pop. Discover.

![Social Banner](social-banner.png)

## Games

### 🎈 Pop

Bouncing emojis float and spin around the screen. Tap one to pop it with a burst of confetti and a satisfying sound. Each round adds one more emoji — how far can you go?

### ✨ Reveal

A dark starfield canvas. Every tap reveals a surprise emoji with a sparkle burst. Swipe to give it momentum — it'll fly across the screen and gently implode after a few seconds.

## Dev

**Requirements:** Node.js (for `npx`)

```bash
# serve locally
npm run dev          # → http://localhost:3000
```

Open on a phone via your local IP (e.g. `http://192.168.x.x:3000`) for the full touch experience. Chrome on Android will offer an "Add to Home Screen" prompt after a few visits.

## PWA icons

The PNG icons aren't tracked in git. To generate them:

1. While the dev server is running, open `http://localhost:3000/icons/generate.html`
2. Three PNGs will auto-download: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
3. Move them into `icons/`

The SVG icon (`icons/icon.svg`) is tracked and sufficient for Android PWA installs.

## Project structure

```text
index.html          — three screens: menu, Pop, Reveal
style.css           — animated gradient menu, game backgrounds, overlay
manifest.json       — PWA manifest (portrait, standalone)
sw.js               — service worker (cache-first offline support)
js/
  sounds.js         — Web Audio API synth: pop, sparkle, fanfare
  particles.js      — Particle class + spawnBurst(); shared EMOJIS[]
  pop-game.js       — bouncing physics, tap detection, round progression
  reveal-game.js    — starfield, touch/drag/inertia, emoji lifecycle
  app.js            — screen routing, fullscreen request, SW registration
icons/
  icon.svg          — source icon (tracked)
  generate.html     — open in browser to generate PNG icons
```

## Tech

Vanilla JS · Canvas 2D · Web Audio API · CSS animations · No build step · No dependencies
