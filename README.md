# Read Journey — Frontend

Frontend for **Read Journey**, a reading-progress tracker. Users build a personal library, log reading sessions page by page, and track their progress through a diary and statistics view.

> Read Journey is not a reader or an audiobook player. Users read a physical (or any other) book on their own; the app logs page numbers, time, and builds progress stats.

**Live:** https://readjourney.viach.dev
**Backend:** https://api-readjourney.viach.dev ([repository](https://github.com/Viacheslav-Bo/read-journey-backend))

## Tech stack

- **React 19** + **TypeScript**
- **Vite** — build tool and dev server
- **React Router 7** — routing, including protected routes
- **Zustand** — global auth state (access token + user)
- **Formik** + **Yup** — forms and validation
- **axios** — HTTP client with a request interceptor for the auth header
- **react-toastify** — error and success notifications
- **CSS Modules** — component-scoped styling, mobile-first

## Features

- Registration and login with client-side validation, inline field states (hover / error / valid)
- Session restore on page reload via refresh-token cookie, so a hard refresh doesn't log you out
- Recommended books with server-side pagination and title/author filters, backed by an Open Library proxy
- Personal library: add books manually, filter by reading status, remove with confirmation
- Reading sessions: start/stop by page number, with a diary of past sessions and a circular progress chart
- Skeleton loaders and fallback data when the external book API is slow or unavailable
- Burger menu on mobile and tablet, full navigation on desktop

## Project structure

```
src/
  api/          — axios instance and request functions per resource
  components/   — reusable UI components, each in its own folder with a CSS module
  constants/    — static data (fallback books)
  hooks/        — data-fetching hooks (useBooks, useLibrary, useReadingBook)
  pages/        — one folder per route
  routes/       — AppRoutes, ProtectedRoute, HomeRedirect
  store/        — Zustand auth store
  styles/       — fonts
  types/        — shared TypeScript types
```

## Routing

| Path               | Access    | Description                                                     |
| ------------------ | --------- | --------------------------------------------------------------- |
| `/`                | public    | Redirects to `/recommended` or `/login` depending on auth state |
| `/register`        | public    | Registration form                                               |
| `/login`           | public    | Login form                                                      |
| `/recommended`     | protected | Recommended books with filters and pagination                   |
| `/library`         | protected | Personal library                                                |
| `/reading/:bookId` | protected | Reading session, diary, and statistics for one book             |

Protected routes are wrapped in a single `ProtectedRoute` using nested routes and `<Outlet />`, which also renders the shared `Header`.

## Responsive design

Mobile-first, with breakpoints at **768px** (tablet) and **1440px** (desktop). Below 375px the layout is fluid; from 375px to 767px it stays fixed at mobile width.

## Setup

```bash
git clone https://github.com/Viacheslav-Bo/read-journey-frontend
cd read-journey-frontend
npm install
```

`.env`:

```dotenv
VITE_API_URL=https://api-readjourney.viach.dev
```

Run:

```bash
npm run dev
```

Build:

```bash
npm run build
```

## Deployment

Deployed on **Vercel**, with the domain managed through Cloudflare DNS (CNAME, DNS-only). A `vercel.json` rewrite sends all paths to `index.html` so client-side routing works on direct navigation and page reloads.

## Author

**Viacheslav Bobivnyk** — fullstack developer (Next.js, React, Node.js, TypeScript), based in Lviv, Ukraine.

- GitHub: [@Viacheslav-Bo](https://github.com/Viacheslav-Bo)
  Both the frontend and the backend of this project were designed and built from scratch as a personal project.
