# CLAUDE.md - AI Assistant Guide for ESVIEM Website

## Project Overview

**ESVIEM** is a Ukrainian business consulting website for comprehensive business services including legal, financial, land, and construction consulting. This is a production monorepo built with modern web technologies.

**Primary Language**: Ukrainian (lang="uk")
**Domain**: esviem.kiev.ua
**Purpose**: Marketing and lead generation for ESVIEM consulting services

---

## Technology Stack

### Frontend (apps/web)
- **Framework**: Next.js 14.2.3 with App Router
- **React**: 18.3.1
- **Styling**: Tailwind CSS 3.4.0 + PostCSS + Autoprefixer
- **Animation**: Framer Motion 12.23.24
- **TypeScript**: 5.4.0 (strict mode enabled)
- **Build Tool**: Next.js built-in (Turbopack available but disabled)

### Backend (apps/api)
- **Framework**: FastAPI 0.111.0
- **Server**: Uvicorn 0.29.0 with standard extras
- **Validation**: Pydantic 2.7.0
- **Runtime**: Python 3.11
- **CORS**: Configured for localhost:3000 and production domains

### Database (packages/db)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Schema**: Single `Lead` model (id, name, email, phone, message, createdAt)
- **Status**: Schema defined but NOT currently integrated with API

### Build System
- **Package Manager**: pnpm 10.20.0 (explicitly set)
- **Monorepo Tool**: Turborepo v2.6
- **Workspace**: apps/* and packages/*

### Analytics & Monitoring
- **Vercel Speed Insights**: ^1.2.0 (root dependency)

---

## Project Structure

```
esviem-website/
├── apps/
│   ├── web/                      # Next.js frontend application
│   │   ├── src/app/             # ACTIVE source directory (use this)
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── about/           # About page
│   │   │   ├── contact/         # Contact page with form
│   │   │   ├── api/             # Next.js API routes
│   │   │   ├── globals.css      # Global styles with Tailwind
│   │   │   └── layout.tsx       # Root layout
│   │   ├── app/                 # LEGACY duplicate (contains sitemap.ts, page.tsx, layout.tsx)
│   │   ├── next.config.mjs      # Web app Next.js config
│   │   ├── tailwind.config.js   # Tailwind configuration
│   │   ├── tsconfig.json        # TypeScript config (@/* → src/*)
│   │   ├── vercel.json          # Vercel redirects
│   │   └── package.json         # Web app dependencies
│   │
│   └── api/                      # FastAPI backend
│       ├── app/
│       │   ├── main.py          # FastAPI app entry point
│       │   └── routers/
│       │       └── contact.py   # Contact form endpoint
│       ├── requirements.txt     # Python dependencies
│       ├── runtime.txt          # Python 3.11 runtime
│       └── Dockerfile           # API Docker config
│
├── packages/
│   └── db/                       # Prisma database schema
│       └── schema.prisma        # PostgreSQL schema (not integrated)
│
├── content/                      # Markdown content files
├── public/                       # Root-level static assets (city-background.jpg, og-image.png, robots.txt)
├── .github/workflows/           # CI/CD workflows
├── .vercel/                      # Vercel deployment config
│   ├── build-config.json        # Build commands for Vercel
│   └── project.json             # Project and org IDs
├── turbo.json                    # Turborepo configuration (v2.6 schema)
├── pnpm-workspace.yaml          # Workspace definition
├── pnpm-lock.yaml               # Lockfile
├── docker-compose.yml           # Production Docker setup
├── CLAUDE.md                    # This file - AI assistant guide
├── SECURITY.md                  # Security policy
└── package.json                 # Root workspace configuration
```

### Critical Path Information

**IMPORTANT DUPLICATIONS TO BE AWARE OF:**

1. **Two App Directories in apps/web:**
   - `apps/web/src/app/` - **ACTIVE** (use this for all page changes and new features)
   - `apps/web/app/` - Legacy/duplicate (contains: page.tsx, layout.tsx, sitemap.ts)
   - **Note**: The sitemap.ts file is currently in the legacy directory

2. **Multiple Next.js Configs:**
   - `apps/web/next.config.mjs` - **PRIMARY** (web app specific)
   - `next.config.ts` - Root level (newer with server actions)
   - `next.config.mjs` - Root level (simpler variant)
   - **Recommendation**: Use `apps/web/next.config.mjs` for web changes

---

## Development Workflow

### Initial Setup

```bash
# Install dependencies
pnpm install

# Start frontend dev server (port 3000)
pnpm dev

# Start backend dev server (port 8000)
pnpm dev:api
```

### Available Scripts

**Root Level (`package.json`):**
- `pnpm dev` - Start web frontend only
- `pnpm dev:api` - Start FastAPI backend with hot reload

**Web App (`apps/web/package.json`):**
- `pnpm dev` - Next.js dev server
- `pnpm build` - Production build
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linter

### Building for Production

```bash
# Build web app using Turbo
pnpm --filter web build

# Or use Turbo directly
turbo build
```

### Docker Development

```bash
# Start all services (db, api, web)
docker-compose up

# Start with debugging
docker-compose -f compose.debug.yaml up

# Start web only
docker-compose -f compose.yaml up
```

---

## Key Conventions and Patterns

### Code Organization

1. **Monorepo Pattern**: Clear separation between frontend, backend, and shared packages
2. **Next.js App Router**: Uses `src/app` directory structure
3. **API Routes**: Next.js API routes can proxy to FastAPI backend
4. **Module Aliases**: `@/*` maps to `src/*` in web app

### Naming Conventions

- **Files/Routes**: kebab-case (e.g., `land-consulting/`)
- **Components**: PascalCase (e.g., `ContactPage`)
- **Config Files**: Standard naming (next.config, tsconfig.json)
- **Language**: Ukrainian for UI text and content

### Component Patterns

**Example from `apps/web/src/app/page.tsx`:**

```tsx
// Server components by default (no "use client")
export default function Home() {
  return (
    <main className="bg-white">
      {/* Semantic sections with Tailwind utility classes */}
      <section className="pt-32 pb-40 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        {/* Max-width container pattern */}
        <div className="max-w-6xl mx-auto px-6">
          {/* Content */}
        </div>
      </section>
    </main>
  );
}
```

### Styling Approach

- **Utility-First**: Tailwind CSS with custom global styles
- **Color Palette**: Slate shades + Blue accent colors
- **Responsive**: Mobile-first with Tailwind breakpoints (`md:`, `lg:`)
- **Layout**: Consistent max-width container (`max-w-6xl mx-auto px-6`)
- **Dark Mode**: CSS prepared but not actively implemented
- **Custom Scrollbar**: Styled in globals.css

### Form Handling Pattern

Current flow (from contact form):
1. Client-side React form with validation
2. Submit to Next.js API route (`/api/contact`)
3. Next.js route forwards to FastAPI (`POST /contact`)
4. FastAPI validates and returns data (DB not integrated)

### Architectural Patterns

- **BFF (Backend for Frontend)**: Next.js API routes act as intermediary
- **Server Components**: Default in Next.js 14 App Router
- **Type Safety**: TypeScript strict mode enabled
- **CORS**: Configured in FastAPI for allowed origins

---

## Deployment Information

### Vercel (Primary Deployment)

**Configuration:**
- Build Command: `pnpm --filter web build`
- Install Command: `pnpm install`
- Output Directory: `apps/web/.next`

**Redirects (in `apps/web/vercel.json`):**
- www.esviem.kiev.ua → esviem.kiev.ua (permanent)
- HTTP → HTTPS (permanent)

**Files:**
- `.vercel/build-config.json` - Build configuration
- `.vercel/project.json` - Project and org IDs

### Docker Deployment

**Services in `docker-compose.yml`:**
- `db`: PostgreSQL 15-alpine on port 5432
- `api`: FastAPI on port 8000
- `web`: Next.js on port 3000

**Environment Variables Required:**
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_API_URL`: API endpoint (default: http://localhost:8000)
- `CORS_ORIGINS`: Allowed CORS origins (comma-separated)

### CI/CD

- **GitHub Actions**: Webpack build workflow in `.github/workflows/webpack.yml`
- **Node Versions**: Tests on 18.x, 20.x, 22.x
- **CRITICAL ISSUE**: Workflow uses `npm install` and `npx webpack` instead of `pnpm` and Turbo/Next.js
- **Recommendation**: Update workflow to use `pnpm install` and `pnpm --filter web build`

---

## Current State and TODOs

### Completed Features

- Homepage with hero, services, about, CTA sections
- About page
- Contact page with form
- FastAPI backend with contact endpoint
- Responsive design with Tailwind
- Vercel deployment configuration
- Docker setup for all services

### Known Issues & Technical Debt

1. **Database Not Integrated**
   - Prisma schema exists in `packages/db/schema.prisma`
   - API contact endpoint has TODO comment for DB integration
   - No Prisma client installed or used

2. **Duplicate Directories**
   - Two `app/` directories in web project
   - Multiple Next.js config files

3. **Missing Pages** (referenced in sitemap but not implemented):
   - `/services` - Parent services page
   - `/services/land-consulting`
   - `/services/construction-consulting`
   - `/services/financial-consulting`
   - `/services/legal-consulting`
   - `/portfolio`
   - `/faq`
   - **Note**: These URLs are defined in `apps/web/app/sitemap.ts` for SEO purposes

4. **CI/CD Misalignment**
   - GitHub Actions workflow uses webpack instead of Turbo/Next.js

5. **Environment Variables**
   - No `.env.example` file for reference
   - Required vars not documented

---

## Important Notes for AI Assistants

### When Making Changes

1. **Always work in `apps/web/src/app/`** - NOT `apps/web/app/`
2. **Use pnpm** - Package manager is explicitly set to pnpm 10.20.0
3. **Filter commands** - Use `pnpm --filter web <command>` for web-specific operations
4. **Language** - All UI text should be in Ukrainian
5. **Styling** - Follow existing Tailwind patterns (max-w-6xl, slate colors, etc.)
6. **Type Safety** - TypeScript strict mode is enabled, maintain type safety

### File Path Quick Reference

**Critical Files:**
- Next.js Config: `apps/web/next.config.mjs`
- Web Package: `apps/web/package.json`
- Root Package: `package.json`
- Turbo Config: `turbo.json`
- Tailwind Config: `apps/web/tailwind.config.js`
- TypeScript Config: `apps/web/tsconfig.json`
- API Entry: `apps/api/app/main.py`
- Prisma Schema: `packages/db/schema.prisma`

**Page Routes:**
- Homepage: `apps/web/src/app/page.tsx`
- About: `apps/web/src/app/about/page.tsx`
- Contact: `apps/web/src/app/contact/page.tsx`
- Root Layout: `apps/web/src/app/layout.tsx`
- Sitemap: `apps/web/app/sitemap.ts` (in legacy directory)

**API Routes:**
- Contact API: `apps/web/src/app/api/contact/route.ts`
- FastAPI Contact: `apps/api/app/routers/contact.py`

### Common Tasks

**Adding a New Page:**
```bash
# Create new route directory
mkdir apps/web/src/app/new-page

# Create page component
# File: apps/web/src/app/new-page/page.tsx
```

**Modifying Styles:**
- Global styles: `apps/web/src/app/globals.css`
- Tailwind config: `apps/web/tailwind.config.js`
- Use existing utility classes when possible

**Adding Dependencies:**
```bash
# Frontend dependency
pnpm --filter web add package-name

# Backend dependency
cd apps/api && pip install package-name
# Then update requirements.txt
```

**Testing Locally:**
```bash
# Terminal 1: Frontend
pnpm dev

# Terminal 2: Backend
pnpm dev:api

# Access: http://localhost:3000
```

### Design System Reference

**Colors:**
- Primary: Blue (bg-blue-600, text-blue-400)
- Neutrals: Slate shades (slate-50 to slate-900)
- Backgrounds: White, slate-50, slate-900

**Spacing:**
- Section padding: `py-24`
- Container: `max-w-6xl mx-auto px-6`
- Card padding: `p-6` or `p-10`

**Typography:**
- Headings: `text-4xl` to `text-6xl` with `font-bold`
- Body: Default with `text-slate-600` or `text-slate-300`
- Line height: `leading-tight` or `leading-7`

**Components:**
- Buttons: Rounded (`rounded-lg`), padding, hover states
- Cards: White background, shadow, rounded (`rounded-xl`)
- Links: Smooth transitions, hover states

---

## SEO and Metadata

**Sitemap**: Generated via `apps/web/app/sitemap.ts` (TypeScript function returning MetadataRoute.Sitemap)
**Sitemap URLs**: Includes all current and planned pages (home, about, services, portfolio, faq, contact)
**Metadata**: Centralized in root layout and page-specific metadata exports
**Language**: `<html lang="uk">` for Ukrainian
**OG Image**: `public/og-image.png`
**Robots**: `public/robots.txt`

---

## Recent Changes (Git History Context)

Based on recent commits:
- Vercel deployment fixes and optimizations
- Turbo.json updated to v2.6 schema
- PackageManager field added to root package.json
- Full project synchronization before deploy

---

## Getting Help

**Documentation:**
- Next.js 14: https://nextjs.org/docs
- FastAPI: https://fastapi.tiangolo.com
- Tailwind CSS: https://tailwindcss.com
- Turborepo: https://turbo.build/repo/docs
- Prisma: https://www.prisma.io/docs

**README**: `/home/user/esviem-website/README.md` (brief, in Ukrainian)

---

## Summary for Quick Onboarding

This is a **pnpm monorepo** with:
- **Frontend**: Next.js 14 + TypeScript + Tailwind (Ukrainian language)
- **Backend**: FastAPI + Python 3.11 (contact form handler)
- **Database**: Prisma + PostgreSQL (defined but not integrated)
- **Deploy**: Vercel (frontend) + Docker (full stack)
- **Build**: Turborepo for orchestration

**Start here:**
1. Run `pnpm install`
2. Work in `apps/web/src/app/` for frontend
3. Work in `apps/api/app/` for backend
4. Follow existing Tailwind patterns
5. Keep all text in Ukrainian

**Watch out for:**
- Duplicate app directories (use `src/app` for new pages, sitemap is in `app/`)
- Multiple Next.js configs (use `apps/web/next.config.mjs`)
- Database not connected (Prisma schema exists but unused)
- Missing service detail pages (referenced in sitemap but not created)
- GitHub Actions workflow needs updating (uses npm/webpack instead of pnpm/Turbo)
- No apps/web/public directory (static assets are in root-level public/)

---

## Repository Statistics

- **Total TypeScript Files**: 9 in apps directory
- **Implemented Pages**: 3 (home, about, contact)
- **Planned Pages**: 6 (services parent + 4 service types, portfolio, faq)
- **Active Development Branch**: claude/claude-md-mhyjdslqho4mh5yg-01WWv7n4bTmLUGX4FvujW7ng

---

*Last Updated: 2025-11-14*
*Generated by: Claude AI Assistant*
*Version: 2.0 - Verified against actual repository structure*
