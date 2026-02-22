# Claude Code Instructions: Landing Page with Cloudflare Access Auth

## Overview

This is an existing Angular app hosted on GitHub Pages at `www.kasperda.dk`. We need to add an **Apps page** that serves as a hub for accessing various web applications hosted on subdomains. Some apps are public, some are protected behind Cloudflare Access authentication.

## Architecture

- **Domain:** `kasperda.dk` (DNS managed via Cloudflare)
- **Landing page:** `www.kasperda.dk` — this Angular app (GitHub Pages)
- **Protected apps:** Behind Cloudflare Access, which sets a `CF_Authorization` JWT cookie on `.kasperda.dk`
- **Auth enforcement:** Cloudflare Access handles real security at the network level. The landing page only reads the cookie for UI purposes (toggling icons).

---

## Configuration: Environment Variables / Constants

Create a configuration file at `src/environments/app-config.ts` (or integrate into the existing environment files) with the following. Use dummy values for now — these will be replaced when real subdomains are set up.

```typescript
export const APP_CONFIG = {
  // Cloudflare Access settings
  cloudflare: {
    // The Cloudflare Access auth endpoint for your domain.
    // When a user visits this URL, Cloudflare shows the login screen.
    // After auth, it redirects back to the redirect URI.
    // Replace with your real Cloudflare Access application login URL.
    loginUrl: 'https://YOURTEAM.cloudflareaccess.com/cdn-cgi/access/login/DUMMY_APP_ID',

    // Where to redirect after Cloudflare auth completes
    postLoginRedirectUrl: 'https://www.kasperda.dk/apps',

    // Cookie name set by Cloudflare Access (this is the standard name)
    cookieName: 'CF_Authorization',
  },

  // App definitions
  apps: [
    {
      id: 'cooking',
      name: 'Cooking',
      description: 'Recipes, meal plans, and more',
      icon: 'restaurant', // Material icon name
      url: 'https://cooking.kasperda.dk',
      requiresAuth: false, // Has its own auth, always accessible
      color: '#FF6B35',
    },
    {
      id: 'offers',
      name: 'Supermarket Offers',
      description: 'Current deals from local supermarkets',
      icon: 'local_offer',
      url: 'https://offers.kasperda.dk',
      requiresAuth: true, // Protected by Cloudflare Access
      color: '#4CAF50',
    },
    {
      id: 'blog',
      name: 'Blog',
      description: 'Personal blog and notes',
      icon: 'article',
      url: 'https://blog.kasperda.dk',
      requiresAuth: true, // Protected for now, may become public later
      color: '#2196F3',
    },
  ],
};
```

> **Note:** All URLs above are placeholders. The subdomains don't exist yet. For development/demo purposes, protected app links can point to `#` or any public page so we can see the UI behavior.

---

## Feature Requirements

### 1. Auth Service (`src/app/services/auth.service.ts`)

Create an `AuthService` that handles Cloudflare Access cookie detection:

- **`isAuthenticated()`** — Returns `boolean`. Checks if the `CF_Authorization` cookie exists on the current domain.
- **`getTokenExpiry()`** — Decodes the JWT payload (base64, no signature verification needed) and returns the `exp` claim as a `Date`. Returns `null` if no cookie or invalid format.
- **`isTokenExpired()`** — Uses `getTokenExpiry()` to check if the token is still valid.
- **`login()`** — Redirects the browser to the Cloudflare Access login URL (from config), with a `redirect_url` query parameter pointing back to the apps page.
- **`logout()`** — Clears the `CF_Authorization` cookie (set path to `/`, domain to `.kasperda.dk`) and refreshes the auth state. Note: Cloudflare may also have its own logout endpoint; for now just clear the cookie locally.
- Expose an observable `isAuthenticated$` (BehaviorSubject) so components can react to auth state changes. Update it on init and after login/logout.

**Important:** We are NOT validating the JWT signature client-side. Cloudflare Access enforces real auth at the network level. The cookie check here is purely cosmetic — it controls which icons appear active in the UI. Do not implement a backend token validation flow.

**Cookie reading:** Use `document.cookie` to read the cookie. The `CF_Authorization` cookie is set by Cloudflare on `.kasperda.dk`, so it will be readable from `www.kasperda.dk`. During local development (`localhost`), the cookie won't exist, so add a **dev mode override**: if the app is running on `localhost`, check for a `localStorage` flag like `dev_auth_override` that can simulate being authenticated (useful for UI development).

### 2. Apps Page Component

Create a new route `/apps` with a component that displays the app grid:

#### Layout
- Page title: "Apps" or "My Apps"
- Optional subtitle or brief description
- A grid/card layout showing each app from the config
- A login/logout button in the top-right area or prominently placed

#### App Card Behavior
Each app card should display:
- An icon (use Material Icons or any icon set already in the project)
- The app name
- A short description
- Visual indication of its state

**States:**

| Condition | Visual | Click Behavior |
|---|---|---|
| `requiresAuth: false` | Always active, full color | Navigates to `app.url` |
| `requiresAuth: true` AND authenticated | Active, full color | Navigates to `app.url` |
| `requiresAuth: true` AND NOT authenticated | Grayed out / dimmed, with a lock icon overlay | Shows a tooltip or message like "Login required" — does NOT navigate |

#### Login Button
- When NOT authenticated: Show a "Login" button. Clicking it calls `authService.login()`.
- When authenticated: Show a "Logged in" indicator (e.g., a small checkmark or user icon) and optionally a "Logout" button. Clicking logout calls `authService.logout()`.

#### Responsive Design
- Cards should wrap nicely on mobile (1 column) vs desktop (2-3 columns)
- Keep it clean and minimal — this is a personal landing page, not a corporate dashboard

### 3. Routing

- Add the `/apps` route to the Angular router
- Consider whether `/apps` should be the default route or if there's an existing homepage. If there's an existing homepage, add a navigation link to the Apps page. If the app is mostly empty, `/apps` can be the default.
- Ensure the route works with GitHub Pages (hash routing or 404.html redirect, depending on what's already configured)

### 4. Navigation

- Add an "Apps" link to any existing navigation/header in the app
- The apps page should be accessible without authentication (it's the landing page itself — auth only affects which app links are active)

---

## Dummy/Development Mode

Since the subdomains don't exist yet, add the following for development and demo purposes:

1. **Dev auth toggle:** When running on `localhost`, add a small floating dev toolbar (or just a button at the bottom of the apps page) that toggles the `dev_auth_override` flag in localStorage. This simulates logging in/out so you can see the UI state change without needing Cloudflare.

2. **Placeholder URLs:** The app URLs in the config can point to the subdomain URLs (they'll 404 for now, that's fine). Alternatively, for demo purposes, you could temporarily point them to any public page. The important thing is seeing the card grid, the active/inactive states, and the login toggle.

3. **Conditional dev toolbar:** Only show the dev toolbar when `window.location.hostname === 'localhost'` or `window.location.hostname === '127.0.0.1'`. Never show it in production.

---

## Styling Guidelines

- Match the existing style of the Angular app (check what CSS framework or approach is already used)
- If no strong styling exists yet, keep it simple and modern: clean cards with subtle shadows, rounded corners, a muted color palette with the accent colors from the app config
- The grayed-out state for locked apps should be clearly visually distinct but not ugly — think opacity reduction + desaturation + a small lock icon, not a harsh disabled look
- Transitions: add a subtle transition when cards go from locked to unlocked (e.g., after login, cards could briefly animate into their active state)

---

## File Structure (suggested)

```
src/app/
├── services/
│   └── auth.service.ts          # Cloudflare Access cookie handling
├── models/
│   └── app-config.model.ts      # TypeScript interfaces for app config
├── pages/
│   └── apps/
│       ├── apps.component.ts
│       ├── apps.component.html
│       ├── apps.component.scss
│       └── app-card/
│           ├── app-card.component.ts
│           ├── app-card.component.html
│           └── app-card.component.scss
└── environments/
    └── app-config.ts            # App and Cloudflare config with dummy values
```

Adapt this to whatever structure the project already uses. Don't fight the existing conventions.

---

## Summary of What Gets Built

1. **Config file** with dummy Cloudflare and app data
2. **AuthService** that reads `CF_Authorization` cookie + dev mode override
3. **Apps page** with a card grid, conditional active/inactive states, and login/logout button
4. **App card component** with visual states (active, locked, hover effects)
5. **Routing** to `/apps`
6. **Dev toolbar** for local testing of auth states

No backend. No real Cloudflare setup (that's a separate infrastructure task). Just the Angular client-side implementation with sensible dummy values that can be swapped out later.
