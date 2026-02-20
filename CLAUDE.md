# CLAUDE.md

## Project Overview

Personal landing page for kasperda.dk — an Angular 17 app hosted on GitHub Pages. The Angular project lives in the `kasperda/` subdirectory.

## Tech Stack

- **Angular 17.2** (standalone components, no NgModules)
- **Angular Material 17.3** (toolbar, cards, buttons, icons, tooltips)
- **SCSS** with modular partials in `src/styles/`
- **Font Awesome 6** (CDN) for social icons
- **Material Icons** (Google Fonts CDN) for app UI icons
- **No backend** — static site on GitHub Pages

## Project Structure

```
kasperda/src/app/
├── components/
│   ├── home/              # Landing page
│   ├── about/             # About page
│   ├── food-waste/        # Madspild page
│   ├── footer/            # Site footer
│   └── apps/              # Apps hub page
│       ├── apps.component.*
│       └── app-card/      # Individual app card
│           └── app-card.component.*
├── navbar/                # Top navigation bar
├── services/
│   └── auth.service.ts    # Cloudflare Access auth (cookie-based)
├── models/
│   └── app-config.model.ts  # TypeScript interfaces
├── app.routes.ts          # Routes: /home, /about, /food-waste, /apps
├── app.config.ts          # Angular providers
└── app.component.*        # Root component (navbar + router-outlet + footer)

kasperda/src/
├── environments/
│   └── app-config.ts      # App definitions and Cloudflare config (dummy values)
└── styles/
    ├── main.scss           # Entry point
    ├── _variables.scss     # Theme, breakpoints, spacing
    ├── _typography.scss
    ├── _buttons.scss
    └── _layout.scss
```

## What Was Built (auth-setup branch)

### Apps Page (`/apps`)
A hub page displaying app cards in a responsive grid. Each card links to a subdomain app (cooking, offers, blog). Cards that require Cloudflare Access auth appear grayed out with a lock icon when the user isn't authenticated.

### Auth Service
Reads the `CF_Authorization` JWT cookie set by Cloudflare Access. Purely cosmetic — real auth is enforced at the Cloudflare network level. Features:
- Cookie detection + JWT expiry parsing (no signature verification)
- `isAuthenticated$` observable for reactive UI
- Dev mode: on localhost, uses `localStorage` flag `dev_auth_override` to simulate auth
- Login redirects to Cloudflare Access login URL; logout clears cookie

### Dev Toolbar
Floating button (bottom-right) only visible on localhost. Toggles the dev auth override to test locked/unlocked card states without real Cloudflare.

## Key Conventions

- All components use `standalone: true`
- Routes defined in `app.routes.ts` as a flat array
- SCSS variables/breakpoints in `src/styles/_variables.scss`
- Material theme: primary=blue, accent=pink, warn=red
- Responsive mixin: `respond-to()` with breakpoints at 576/768/992/1200px
- Navigation uses Danish labels (Madspild, Om) except "Apps"

## Build & Run

```bash
cd kasperda
npm install
npx ng serve      # Dev server at localhost:4200
npx ng build      # Production build
```

## Config to Update Later

- `src/environments/app-config.ts` — Replace dummy Cloudflare login URL and app subdomain URLs with real values once infrastructure is set up
