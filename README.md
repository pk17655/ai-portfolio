# Pawan Kumar — AI/Robotics Portfolio

A highly interactive, animated personal portfolio with a **"sentient interface"** aesthetic:
deep-space navy UI, neon cyan/violet accents, glassmorphism, an animated 3D AI-core avatar
that tracks your cursor, a neural-network particle field, a terminal-style typing hero, a
custom glowing cursor, and scroll-linked "system initializing" motion.

**Every piece of personal content lives in JSON** under [`src/config/`](src/config). Edit the
JSON, save, and the site updates — no component code changes needed.

---

## Tech stack

| Concern | Library |
|---|---|
| Framework / build | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 (theme tokens injected from JSON) |
| Animation | Framer Motion 11 |
| Scroll-linked animation | GSAP 3 + ScrollTrigger |
| 3D avatar | Three.js + React Three Fiber + drei |
| Smooth scroll | Lenis |
| Charts | Recharts (skills radar) |
| Icons | lucide-react |
| Global state | Zustand |

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build + local preview
npm run build
npm run preview
```

> Requires Node 18+ (Node 20+ recommended).

---

## Project structure

```
.
├─ index.html                 # HTML shell, fonts, meta tags
├─ vite.config.js             # Vite + manual vendor chunking + "@" alias -> /src
├─ tailwind.config.js         # Design tokens map to CSS variables
├─ postcss.config.js
├─ public/
│  ├─ favicon.svg
│  ├─ images/projects/*.svg   # Project preview art (replace with screenshots)
│  ├─ images/logos/*.svg      # Company / school logos (optional)
│  └─ resume/Pawan_Kumar_Resume_2026.pdf
└─ src/
   ├─ main.jsx                # App entry; applies theme before first paint
   ├─ App.jsx                 # Composition of all sections + global chrome
   ├─ index.css               # Tailwind layers, theme variables, utility classes
   ├─ config/                 # ← ALL YOUR CONTENT (see schema below)
   ├─ components/             # Reusable UI (Navbar, cards, cursor, effects…)
   ├─ sections/               # Page sections (Hero, About, Skills, …)
   ├─ three/                  # 3D avatar scene (React Three Fiber)
   ├─ hooks/                  # useMediaQuery, useScrollProgress, useActiveSection…
   ├─ store/useStore.js       # Zustand global state (theme, active section, menu)
   └─ utils/                  # animation variants, theme injection, helpers
```

---

## ✏️ Editing your content (`src/config/`)

All personal data is externalized. Below is the schema for **every** file. Types use TS-ish
notation; everything is plain JSON.

### `personal.json`
Identity, hero copy, contact, social links, and the animated stat counters.

```jsonc
{
  "name": "Pawan Kumar",              // full name
  "firstName": "Pawan",               // used in the hero headline
  "title": "Senior Software Engineer",// shown above the name
  "roles": ["...", "..."],            // strings cycled by the typing effect
  "tagline": "…",                     // short tagline (spare copy)
  "heroLines": ["…"],                 // optional alt boot lines (spare copy)
  "bio": "…",                         // long bio (About section)
  "shortBio": "…",                    // one-liner under the hero headline
  "location": "Bengaluru, India",
  "availability": "Open to …",        // status pill text
  "availabilityStatus": "online",     // free text (spare)
  "contact": { "email": "…", "phone": "…" },
  "social": [                         // rendered as icon buttons
    { "label": "LinkedIn", "icon": "Linkedin", "url": "https://…" }
  ],
  "resumePdf": "/resume/Your_Resume.pdf", // path under /public
  "profilePhoto": "/images/profile.jpg",  // path under /public (reserved for future use)
  "stats": [                          // animated count-up tiles in About
    { "label": "Years of Experience", "value": 7, "suffix": "+" }
  ]
}
```
- **`social[].icon`** must be a [Lucide icon name](https://lucide.dev/icons) (e.g. `Linkedin`,
  `Github`, `Mail`, `Twitter`, `Globe`). Unknown names fall back to a neutral dot.
- **`stats[].value`** is a number; the counter animates `0 → value`. `suffix` is appended (`"%"`, `"+"`).

### `skills.json`
Categorized skill meters, the radar chart, and soft-skill chips.

```jsonc
{
  "intro": "…",                       // description under the section title
  "categories": [
    {
      "name": "Frontend",
      "icon": "Code2",                // Lucide icon name
      "skills": [
        { "name": "Angular (v8+)", "level": 95 }  // level 0–100 → bar width
      ]
    }
  ],
  "softSkills": ["Frontend Architecture", "…"],   // rendered as chips
  "radar": [                          // powers the Recharts radar chart
    { "axis": "Frontend", "value": 95 }           // value 0–100
  ]
}
```
Add/remove categories or skills freely — the grid reflows automatically. Keep `radar` to
~5–7 axes for readability.

### `experience.json`
Vertical, scroll-animated timeline.

```jsonc
{
  "intro": "…",
  "jobs": [
    {
      "company": "Indegene Pvt Ltd",
      "role": "Senior Full Stack Engineer",
      "location": "Bengaluru, India",
      "start": "Jan 2020",
      "end": "Present",
      "current": true,               // adds a pulsing "live" node
      "logo": "/images/logos/indegene.svg", // optional (reserved)
      "summary": "…",                // one line under the role
      "highlights": ["bullet 1", "bullet 2"],
      "stack": ["Angular", "TypeScript"]     // chips
    }
  ]
}
```
Order matters — list newest first (top of the timeline).

### `education.json`
```jsonc
{
  "intro": "…",
  "degrees": [
    {
      "degree": "B.E. in Computer Science Engineering",
      "institution": "NRI Institute …",
      "location": "India",
      "start": "2015",
      "end": "2019",
      "grade": "7.72 CGPA",          // optional chip
      "honors": ["Dean's List"],     // optional chips
      "logo": "/images/logos/nri.svg" // optional (reserved)
    }
  ]
}
```

### `projects.json`
Filterable project grid + detail modal.

```jsonc
{
  "intro": "…",
  "categories": ["All", "GenAI", "Enterprise", "Frontend", "Full Stack"],
  "items": [
    {
      "title": "Literature Surveillance (LS)",
      "subtitle": "GenAI-powered medical literature platform",
      "category": ["GenAI", "Enterprise"], // must match values in "categories"
      "featured": true,                     // shows a "Featured" badge
      "description": "…",                   // shown on card + modal
      "highlights": ["…"],                  // bullet list in the modal
      "stack": ["Angular", "WebSocket"],    // chips
      "image": "/images/projects/ls.svg",   // card/modal art under /public
      "liveUrl": "",                        // empty string hides the button
      "repoUrl": ""
    }
  ]
}
```
- The first entry in `categories` (`"All"`) is the default filter and shows everything.
- Each project's `category` is an **array**; it appears under every matching filter.
- Leave `liveUrl` / `repoUrl` as `""` to hide those links.

### `certifications.json`
```jsonc
{
  "intro": "…",
  "certifications": [
    {
      "name": "AWS Certified Cloud Practitioner",
      "issuer": "Amazon Web Services",
      "date": "Sep 2023",           // optional
      "credentialUrl": "https://…", // optional → shows a "Verify" link
      "icon": "Cloud"               // Lucide icon name
    }
  ],
  "achievements": [
    { "name": "Winner, Hackathon 2025", "issuer": "Indegene", "icon": "Trophy" }
  ]
}
```

### `theme.json`
Colors, animation speed, and feature toggles. **This drives the entire look.**

```jsonc
{
  "brand": "PK",                     // 1–3 char mark in navbar/splash
  "colors": {
    "dark":  { "bg": "#05070f", "primary": "#22d3ee", "secondary": "#7c3aed", … },
    "light": { "bg": "#eef2fb", "primary": "#0891b2", … }
  },
  "animation": {
    "speed": "normal",               // "slow" | "normal" | "fast"
    "presets": { "slow": 1.4, "normal": 1, "fast": 0.6 }
  },
  "flags": {
    "enableParticles": true,         // neural-net canvas background
    "enable3DRobot": true,           // WebGL avatar (auto-off on mobile/reduced-motion)
    "enableCustomCursor": true,      // glowing cursor (desktop only)
    "enableSplashScreen": true,      // "AI initializing" boot splash
    "enableTypingEffect": true,      // hero role typewriter
    "enableCircuitBackground": true, // animated SVG circuit traces in hero
    "defaultTheme": "dark"           // "dark" | "light"
  },
  "splash": {
    "durationMs": 2600,
    "messages": ["Booting neural core…", "…", "System online."]
  }
}
```

**Color keys** (define both `dark` and `light`): `bg`, `bgAlt`, `surface`, `surfaceAlt`,
`border`, `text`, `textMuted`, `primary`, `secondary`, `accent`, `glow`. They are converted to
CSS variables at runtime (see `src/utils/applyTheme.js`) and consumed through Tailwind classes
like `bg-primary`, `text-content`, `border-borderc`. Change a hex here → the whole site recolors.

---

## Swapping the placeholder assets

| Asset | Where | Notes |
|---|---|---|
| **Resume PDF** | `public/resume/Pawan_Kumar_Resume_2026.pdf` | Replace with your own; keep the path in `personal.json → resumePdf` in sync. A generated copy of your resume is included. |
| **Project images** | `public/images/projects/*.svg` | Replace the generated art with real screenshots (`.png`/`.jpg` also fine — update `projects.json → items[].image`). |
| **Profile photo** | `public/images/profile.jpg` | Referenced by `personal.json → profilePhoto` (reserved for future use). |
| **Company/school logos** | `public/images/logos/*.svg` | Referenced by `experience.json` / `education.json` (reserved). |

---

## How the theming works (for the curious)

1. `theme.json` holds palettes as hex.
2. `src/utils/applyTheme.js` converts each hex to `R G B` channels and writes them to CSS
   variables (`--c-primary`, …) on `:root`.
3. `tailwind.config.js` maps semantic classes (`bg-primary`, `text-content`, …) to those
   variables using the `rgb(var(--x) / <alpha-value>)` pattern, so opacity utilities still work.
4. Toggling the theme (navbar sun/moon) re-runs `applyTheme` and persists the choice to
   `localStorage`.

## Accessibility & performance

- **`prefers-reduced-motion`** is respected everywhere: the splash auto-skips, the typing
  effect renders static text, GSAP/particle motion is disabled, and count-ups jump to final.
- **3D is progressive**: the WebGL avatar loads lazily (`React.lazy`), is disabled on mobile /
  reduced-motion (a CSS orb renders instead), and is wrapped in an error boundary so a WebGL
  failure never breaks the page.
- **Code splitting**: Three.js, Framer Motion/GSAP, and Recharts are split into separate
  vendor chunks; the radar chart and 3D scene are only fetched when needed.
- Semantic landmarks, ARIA labels, keyboard-operable nav, and focus-visible styling are in place.

## Deploying

Any static host works (Vercel, Netlify, GitHub Pages, Cloudflare Pages):

```bash
npm run build      # outputs to /dist
```

- **Vercel/Netlify**: framework = Vite, build command `npm run build`, output dir `dist`.
- **GitHub Pages**: set `base: '/<repo>/'` in `vite.config.js` before building.

---

Built with React, Three.js, Framer Motion & GSAP.
