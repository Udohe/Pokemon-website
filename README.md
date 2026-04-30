# 🎮 Pokédex Lite

A production-quality Pokédex built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Browse, search, filter, compare, and favourite over 1,000 Pokémon — powered by the free [PokéAPI](https://pokeapi.co/).

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔍 Search | Real-time debounced search by name or Pokédex number |
| 🏷️ Type Filter | Filter by all 18 types with colour-coded chips |
| 📄 Pagination | Smart pagination across all 1,000+ Pokémon |
| 📊 Detail Modal | Animated modal — stats, abilities, height/weight, types |
| 🌐 SSR Detail Page | `/pokemon/[name]` server-rendered for SEO |
| ⚔️ Compare | Side-by-side stat comparison of any two Pokémon |
| ❤️ Favorites | Heart-toggle, badge counter, persisted in localStorage |
| 🔐 Auth | Email/password + Google/GitHub OAuth (simulated) |
| 📱 Mobile Nav | Animated slide-in drawer for mobile screens |
| 💀 Skeletons | Shimmer loaders while data fetches |
| 🎨 Animations | Card hovers, floating sprites, spring-modal open/close |
| 🗺️ SEO | Auto sitemap.xml, robots.txt, per-page metadata |
| ⚠️ Errors | Global error boundary + friendly 404 page |

---

## 🚀 Quick Start

```bash
# 1. Enter the project folder
cd pokedex-lite

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000** — hot reload is enabled.

### Production build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
pokedex-lite/
├── app/
│   ├── layout.tsx                  # Root layout (providers + navbar)
│   ├── page.tsx                    # Home — grid, search, filter, pagination
│   ├── loading.tsx                 # Global loading spinner
│   ├── error.tsx                   # Global error boundary
│   ├── not-found.tsx               # Custom 404
│   ├── globals.css                 # Tailwind + custom keyframes
│   ├── sitemap.ts                  # Auto sitemap.xml
│   ├── robots.ts                   # Auto robots.txt
│   ├── compare/page.tsx            # ⚔️  Side-by-side stat compare
│   ├── favorites/page.tsx          # ❤️  Saved Pokémon
│   ├── pokemon/[name]/page.tsx     # SSR Pokémon detail page
│   └── auth/
│       ├── login/page.tsx          # Sign in
│       └── signup/page.tsx         # Create account
│
├── components/
│   ├── auth/AuthForms.tsx          # Login, Signup, OAuth buttons
│   ├── layout/Navbar.tsx           # Desktop nav + mobile drawer
│   ├── pokemon/
│   │   ├── PokemonCard.tsx         # Grid card + skeleton
│   │   └── PokemonModal.tsx        # Detail modal with stat bars
│   └── ui/
│       ├── SearchBar.tsx           # Debounced search input
│       ├── TypeFilter.tsx          # Type chip selector
│       └── Pagination.tsx          # Page navigation
│
├── hooks/
│   ├── usePokemon.ts               # usePokemonList · usePokemonDetail · usePokemonSearch
│   ├── useTypes.ts                 # useTypes · usePokemonByType
│   ├── useDebounce.ts              # Generic debounce
│   └── useLocalStorage.ts          # Type-safe localStorage
│
├── lib/
│   ├── pokemon.ts                  # API helpers, type colours, formatters
│   ├── auth.tsx                    # AuthContext (login/signup/logout/OAuth)
│   └── favorites.tsx               # FavoritesContext (toggle + persist)
│
├── types/
│   ├── pokemon.ts                  # Pokemon, Stat, Type interfaces
│   └── auth.ts                     # User, AuthState, FormData interfaces
│
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | App Router, SSR/SSG, routing |
| TypeScript 5 | Full type safety |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion 11 | Animations and spring transitions |
| PokéAPI v2 | Free Pokémon data (no key needed) |
| localStorage | Client-side auth + favorites persistence |

---

## 🔐 Auth System

Ships with a self-contained client-side auth (no backend needed):

- Sign up with any email & password → stored in `localStorage`
- Google & GitHub OAuth buttons → simulated locally
- Session persists across refreshes

### Upgrading to real OAuth (NextAuth.js)

```bash
npm install next-auth
```

Create `app/api/auth/[...nextauth]/route.ts` with Google/GitHub providers, then set in `.env.local`:

```
NEXTAUTH_SECRET=your-secret
GOOGLE_ID=...
GOOGLE_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...
```

---

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Click **Deploy** — done in ~60 seconds

No environment variables required for the base app.

---

## 📜 Scripts

```bash
npm run dev      # Dev server → localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # ESLint check
```
