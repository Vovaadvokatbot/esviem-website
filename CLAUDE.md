# CLAUDE.md - AI Assistant Guide for ESVIEM Website

> **Last Updated:** 2025-11-14
> **Project:** ESVIEM Consulting Website
> **Architecture:** pnpm Monorepo with Turborepo

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Technology Stack](#technology-stack)
4. [Development Setup](#development-setup)
5. [Code Conventions](#code-conventions)
6. [Key Files Reference](#key-files-reference)
7. [Common Tasks](#common-tasks)
8. [Deployment](#deployment)
9. [Critical Considerations](#critical-considerations)
10. [Git Workflow](#git-workflow)

---

## Project Overview

**ESVIEM Website** is a full-stack consulting firm website built as a monorepo containing:

- **Frontend:** Next.js 14 App Router application (Ukrainian language)
- **Backend:** FastAPI Python application
- **Database:** PostgreSQL with Prisma ORM
- **Purpose:** Marketing site with lead capture functionality

**Domain:** esviem.kiev.ua (deployed on Vercel)

### Key Features
- Server-side rendering with Next.js
- Contact form with API integration
- SEO-optimized with dynamic sitemap
- Markdown-based content management
- Docker-based development environment
- Monorepo architecture for scalability

---

## Repository Structure

```
esviem-website/
├── apps/
│   ├── web/                    # Next.js 14 frontend application
│   │   ├── app/                # NEW: App Router (active implementation)
│   │   │   ├── layout.tsx      # Root layout with SEO metadata
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── globals.css     # Global styles with design system
│   │   │   └── sitemap.ts      # Dynamic sitemap generation
│   │   ├── src/app/            # OLD: Legacy app directory (⚠️ duplicate)
│   │   │   ├── layout.tsx      # Alternative layout
│   │   │   ├── page.tsx        # Alternative homepage
│   │   │   ├── about/          # About page
│   │   │   ├── contact/        # Contact page + API route
│   │   │   └── api/contact/    # API proxy to backend
│   │   ├── package.json        # Web app dependencies
│   │   ├── next.config.mjs     # Next.js configuration
│   │   ├── tailwind.config.js  # Tailwind CSS config
│   │   └── vercel.json         # Vercel deployment settings
│   │
│   └── api/                    # FastAPI backend application
│       ├── app/
│       │   ├── main.py         # FastAPI app initialization
│       │   └── routers/
│       │       └── contact.py  # Contact form endpoint
│       ├── requirements.txt    # Python dependencies
│       ├── runtime.txt         # Python 3.11
│       └── Dockerfile          # API container config
│
├── packages/
│   └── db/                     # Shared database package
│       └── schema.prisma       # PostgreSQL schema (Lead model)
│
├── content/                    # Markdown content files
│   ├── about.md                # About page content
│   ├── faq.md                  # FAQ content
│   └── metadata.json           # Content metadata
│
├── public/                     # Static assets
│   ├── city-background.jpg     # Hero background image
│   ├── og-image.png            # Open Graph image
│   └── robots.txt              # SEO robots file
│
├── pnpm-workspace.yaml         # pnpm workspace configuration
├── turbo.json                  # Turborepo build orchestration
├── package.json                # Root package.json (pnpm 10.20.0)
├── docker-compose.yml          # Multi-service orchestration
└── tsconfig.json               # Root TypeScript config
```

### ⚠️ Important: Duplicate App Directories

There are **TWO app directories** in `apps/web`:
- `/apps/web/app/` - **ACTIVE**: Newer implementation with better SEO
- `/apps/web/src/app/` - **LEGACY**: Older implementation with routing pages

**Convention:** Prefer editing files in `/apps/web/app/` for layout/global changes, but `/apps/web/src/app/` contains the actual page routes and API routes.

---

## Technology Stack

### Frontend (apps/web)

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | 14.2.3 | React framework with App Router |
| **UI Library** | React | 18.3.1 | Component-based UI |
| **Language** | TypeScript | 5.4.0 | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 3.4.0 | Utility-first CSS framework |
| **Animation** | Framer Motion | 12.23.24 | React animation library |
| **Analytics** | Vercel Speed Insights | 1.2.0 | Performance monitoring |
| **Linting** | ESLint | Next.js built-in | Code quality |

### Backend (apps/api)

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | FastAPI | 0.111.0 | Modern Python web framework |
| **Server** | Uvicorn | 0.29.0 | ASGI server |
| **Validation** | Pydantic | 2.7.0 | Data validation |
| **Runtime** | Python | 3.11 | Programming language |

### Database & DevOps

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Database** | PostgreSQL | 15 Alpine | Relational database |
| **ORM** | Prisma | Latest | Database toolkit |
| **Package Manager** | pnpm | 10.20.0 | Fast, disk-efficient |
| **Build System** | Turborepo | 2.x | Monorepo orchestration |
| **Containerization** | Docker | Latest | Development environment |
| **Deployment** | Vercel | N/A | Hosting platform |

---

## Development Setup

### Prerequisites

```bash
# Required
- Node.js 18.x, 20.x, or 22.x
- pnpm 10.20.0 (enforced via packageManager field)
- Docker & Docker Compose (for full-stack development)
- Python 3.11 (for API development)
```

### Installation

```bash
# 1. Install dependencies
pnpm install

# 2. Option A: Frontend only
pnpm dev  # Runs: pnpm --filter web dev
# Frontend: http://localhost:3000

# 3. Option B: Backend only
pnpm dev:api
# API: http://localhost:8000
# API Docs: http://localhost:8000/docs

# 4. Option C: Full stack with Docker
docker-compose up
# Database: localhost:5432
# API: http://localhost:8000
# Web: http://localhost:3000

# 5. Debug mode
docker-compose -f compose.debug.yaml up
# Enables Node.js debugging on port 9229
```

### Environment Variables

**Frontend (apps/web/.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend (apps/api/.env):**
```env
DATABASE_URL=postgresql://esviem:esviem_password@db:5432/esviem_db
```

**Docker Compose (configured):**
```env
POSTGRES_USER=esviem
POSTGRES_PASSWORD=esviem_password
POSTGRES_DB=esviem_db
```

### Build Commands

```bash
# Build all apps (Turborepo)
turbo build

# Build web app only
cd apps/web
pnpm build
pnpm start  # Production server on :3000

# Lint web app
cd apps/web
pnpm lint

# Run monorepo validation (PowerShell)
.\check_monorepo.ps1  # Windows only
```

---

## Code Conventions

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase `.tsx` | `page.tsx`, `layout.tsx` |
| API Routes (Next.js) | lowercase `route.ts` | `app/api/contact/route.ts` |
| Python Modules | snake_case `.py` | `contact.py`, `main.py` |
| Config Files | lowercase | `next.config.mjs`, `tailwind.config.js` |
| Content Files | lowercase `.md` | `about.md`, `faq.md` |

### TypeScript Conventions

**1. Server Components (Default)**
```typescript
// apps/web/src/app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <h1>About ESVIEM</h1>
    </main>
  );
}
```

**2. Client Components (Interactive)**
```typescript
// Use "use client" directive for interactivity
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    // Client-side logic
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**3. Layout Components with Metadata**
```typescript
// apps/web/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ESVIEM - Консалтинг",
    template: "%s | ESVIEM"
  },
  description: "Експертний бізнес-консалтинг в Україні",
  keywords: ["консалтинг", "бізнес", "Київ"],
  openGraph: {
    title: "ESVIEM Консалтинг",
    description: "Експертний бізнес-консалтинг",
    url: "https://esviem.kiev.ua",
    siteName: "ESVIEM",
    locale: "uk_UA",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
```

**4. API Route Handlers (Next.js)**
```typescript
// apps/web/src/app/api/contact/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const res = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Помилка сервера" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
```

### Python Conventions

**1. FastAPI Router Pattern**
```python
# apps/api/app/routers/contact.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter()

class ContactPayload(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    message: str | None = None

@router.post("")
async def create_contact(payload: ContactPayload):
    """Create a new contact lead."""
    # TODO: Save to database via Prisma
    return {"status": "ok", "data": payload}
```

**2. FastAPI App Initialization**
```python
# apps/api/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import contact

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include routers
app.include_router(contact.router, prefix="/contact", tags=["contact"])
```

### Styling Conventions

**Tailwind Utility-First Approach**
```typescript
// Design tokens used throughout the project
<section className="py-24 bg-slate-50">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold mb-12 text-slate-900">
      Наші послуги
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        {/* Card content */}
      </div>
    </div>
  </div>
</section>
```

**Color Palette:**
- **Primary:** `blue-400`, `blue-600`, `blue-700`
- **Neutrals:** `slate-50` to `slate-900`
- **Backgrounds:** `from-slate-900 to-slate-800` (gradients)

**Spacing Scale:**
- Small: `px-6`, `py-4`
- Medium: `px-8`, `py-8`
- Large: `px-12`, `py-24`

**Typography:**
- Headings: `text-4xl`, `text-5xl`, `font-bold`
- Body: Default size, `text-slate-600`
- Links: `text-blue-600 hover:text-blue-700`

### Accessibility Conventions

```typescript
// Use semantic HTML
<main role="main">
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Наші послуги</h2>
  </section>
</main>

// ARIA attributes for dynamic content
<div aria-live="polite" role="status">
  {status && <p>{status}</p>}
</div>

// Form labels
<label htmlFor="email" className="block mb-2">
  Електронна пошта
</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
/>
```

**Language:** Always use `lang="uk"` (Ukrainian)

---

## Key Files Reference

### Configuration Files

#### `turbo.json` - Turborepo Configuration
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```
- Orchestrates builds across workspace
- Caches `.next/` output (excluding cache)
- Dev mode runs persistently without caching

#### `pnpm-workspace.yaml` - Workspace Definition
```yaml
packages:
  - "apps/*"
  - "packages/*"
```
- Defines monorepo package locations
- Used by pnpm for workspace resolution

#### `package.json` (Root)
```json
{
  "packageManager": "pnpm@10.20.0",
  "scripts": {
    "dev": "pnpm --filter web dev",
    "dev:api": "cd apps/api && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
  }
}
```
- Enforces pnpm 10.20.0 via `packageManager` field
- Provides convenience scripts for development

#### `tsconfig.json` - TypeScript Configuration

**Root Config (Loose):**
- `strict: false`
- `allowJs: true`
- Path alias: `@/*` → `./*`

**Web App Config (Strict):**
- `strict: true`
- `allowJs: false`
- Path alias: `@/*` → `src/*`
- Includes Next.js TypeScript plugin

⚠️ **Note:** Web app overrides root config with stricter settings.

#### `apps/web/vercel.json` - Deployment Configuration
```json
{
  "redirects": [
    {
      "source": "http://www.esviem.kiev.ua/:path*",
      "destination": "https://esviem.kiev.ua/:path*",
      "permanent": true
    }
  ]
}
```
- Redirects www → non-www
- Forces HTTPS

#### `docker-compose.yml` - Local Development Stack
```yaml
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: esviem
      POSTGRES_PASSWORD: esviem_password
      POSTGRES_DB: esviem_db
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  api:
    build: ./apps/api
    ports:
      - "8000:8000"
    depends_on:
      - db

  web:
    build: ./apps/web
    ports:
      - "3000:3000"
    depends_on:
      - api
```

### Application Files

#### `apps/web/app/layout.tsx` - Root Layout (Active)
- Defines site-wide SEO metadata
- Sets up HTML structure with `lang="uk"`
- Imports global CSS
- Configures Open Graph tags

#### `apps/web/src/app/layout.tsx` - Legacy Layout
- Alternative implementation (may be outdated)
- Check for inconsistencies with main layout

#### `apps/web/app/sitemap.ts` - Dynamic Sitemap
```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://esviem.kiev.ua",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: "https://esviem.kiev.ua/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
```

#### `apps/api/app/main.py` - API Entry Point
- Initializes FastAPI application
- Configures CORS middleware
- Registers routers (contact)

#### `packages/db/schema.prisma` - Database Schema
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Lead {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  message   String?
  createdAt DateTime @default(now())
}
```

---

## Common Tasks

### Adding a New Page (Next.js)

```bash
# 1. Create page in src/app (active routing)
# apps/web/src/app/services/page.tsx

"use client";

export default function ServicesPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-8">Наші послуги</h1>
        {/* Content */}
      </div>
    </main>
  );
}

# 2. Update sitemap (apps/web/app/sitemap.ts)
# Add new route to the sitemap array

# 3. Test locally
cd apps/web
pnpm dev
# Visit http://localhost:3000/services
```

### Adding a New API Endpoint

```bash
# 1. Create router file
# apps/api/app/routers/services.py

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ServiceQuery(BaseModel):
    category: str

@router.post("")
async def get_services(query: ServiceQuery):
    return {"services": []}

# 2. Register router in main.py
# apps/api/app/main.py

from .routers import contact, services

app.include_router(services.router, prefix="/services", tags=["services"])

# 3. Create Next.js API proxy (optional)
# apps/web/src/app/api/services/route.ts

import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(request: Request) {
  const data = await request.json();
  const res = await fetch(`${API_URL}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return NextResponse.json(await res.json());
}

# 4. Test
curl -X POST http://localhost:8000/services \
  -H "Content-Type: application/json" \
  -d '{"category": "consulting"}'
```

### Updating Database Schema

```bash
# 1. Edit schema
# packages/db/schema.prisma

model Service {
  id          String   @id @default(cuid())
  title       String
  description String
  price       Decimal  @db.Money
  createdAt   DateTime @default(now())
}

# 2. Generate migration
cd packages/db
npx prisma migrate dev --name add_services_table

# 3. Generate Prisma client
npx prisma generate

# 4. Use in API
from prisma import Prisma

prisma = Prisma()
await prisma.connect()

service = await prisma.service.create(
    data={"title": "Консалтинг", "description": "...", "price": 5000}
)
```

### Adding Dependencies

```bash
# Frontend dependency
cd apps/web
pnpm add <package-name>

# Backend dependency
cd apps/api
pip install <package-name>
pip freeze > requirements.txt

# Shared workspace dependency
pnpm add -w <package-name>
```

### Running Tests (To Be Implemented)

```bash
# ⚠️ No testing framework currently configured

# Recommended setup:
# Frontend: Jest + React Testing Library
cd apps/web
pnpm add -D jest @testing-library/react @testing-library/jest-dom

# Backend: Pytest
cd apps/api
pip install pytest pytest-asyncio httpx
```

---

## Deployment

### Vercel (Production)

**Automatic Deployment:**
- Pushes to `main` branch auto-deploy to production
- Preview deployments for all branches
- Domain: esviem.kiev.ua

**Manual Deployment:**
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
cd apps/web
vercel --prod
```

**Configuration:**
- Deployment config: `apps/web/vercel.json`
- Environment variables: Set in Vercel dashboard
- Build command: `pnpm build` (auto-detected)
- Output directory: `.next` (auto-detected)

### Docker (Self-Hosted)

```bash
# Build all services
docker-compose build

# Run in production mode
docker-compose up -d

# View logs
docker-compose logs -f web
docker-compose logs -f api

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### CI/CD (GitHub Actions)

**Workflow:** `.github/workflows/webpack.yml`

```yaml
# Runs on: push, pull_request to main
# Node versions: 18.x, 20.x, 22.x
# Steps:
# 1. Checkout code
# 2. Setup Node.js
# 3. Install dependencies (pnpm)
# 4. Build project
```

**Status:** Check GitHub Actions tab for build status

---

## Critical Considerations

### ⚠️ Known Issues

1. **Duplicate App Directories**
   - `/apps/web/app/` and `/apps/web/src/app/` both exist
   - **Current routing uses:** `/apps/web/src/app/`
   - **Layouts/metadata uses:** `/apps/web/app/`
   - **Action:** Clarify with team which is authoritative

2. **Incomplete API Integration**
   - Contact endpoint returns mock data (TODO comment)
   - Database integration pending
   - **Action:** Implement Prisma client in FastAPI

3. **Missing Test Coverage**
   - No Jest, Pytest, or E2E tests
   - **Action:** Add testing infrastructure

4. **TypeScript Strictness Mismatch**
   - Root config: `strict: false`
   - Web app: `strict: true`
   - **Action:** Align configurations

5. **Environment Variables Not Validated**
   - No `.env.example` files
   - No runtime validation (e.g., `zod`)
   - **Action:** Add env validation

### 🔒 Security Considerations

1. **CORS Configuration**
   - Currently allows `localhost:3000` only
   - Update for production domain in `apps/api/app/main.py`

2. **Database Credentials**
   - Hardcoded in `docker-compose.yml`
   - **Action:** Use `.env` files for secrets

3. **API Rate Limiting**
   - Not implemented
   - **Action:** Add rate limiting middleware to FastAPI

4. **Input Validation**
   - Pydantic models provide basic validation
   - **Action:** Add custom validators for phone, message length

### 📝 Content Management

- Content stored in `/content/*.md`
- Metadata in `/content/metadata.json`
- **Pattern:** Use markdown for static content, database for dynamic

### 🌐 Internationalization

- Currently: Ukrainian only (`lang="uk"`)
- **Future:** Consider i18n library (next-intl) for multi-language

### 🎨 Design System

- **Not formalized:** No Storybook or component library
- **Current approach:** Ad-hoc Tailwind utilities
- **Recommendation:** Document components in separate guide

---

## Git Workflow

### Branch Strategy

**Active Development Branch:**
```
claude/claude-md-mhyf9rxwxon3cq94-018ozNG55dJN3mgYBdtfHxnD
```

**Naming Convention:**
- All Claude-generated branches start with `claude/`
- Must end with matching session ID
- Format: `claude/<description>-<session-id>`

### Git Commands

**Push (with retries):**
```bash
# Always use -u flag for new branches
git push -u origin claude/claude-md-mhyf9rxwxon3cq94-018ozNG55dJN3mgYBdtfHxnD

# If network failure, retry with exponential backoff:
# 1st retry: wait 2s
# 2nd retry: wait 4s
# 3rd retry: wait 8s
# 4th retry: wait 16s
```

**Fetch/Pull:**
```bash
# Fetch specific branch
git fetch origin claude/claude-md-mhyf9rxwxon3cq94-018ozNG55dJN3mgYBdtfHxnD

# Pull with retry logic
git pull origin claude/claude-md-mhyf9rxwxon3cq94-018ozNG55dJN3mgYBdtfHxnD
```

### Commit Messages

**Convention:** Conventional Commits

```bash
# Format: <type>(<scope>): <description>

# Examples:
git commit -m "feat(web): add services page"
git commit -m "fix(api): resolve CORS configuration"
git commit -m "docs: update CLAUDE.md with deployment info"
git commit -m "refactor(web): consolidate app directories"
git commit -m "chore(deps): update pnpm to 10.20.0"
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Scopes:**
- `web`: Frontend app
- `api`: Backend app
- `db`: Database/schema
- `deps`: Dependencies
- `config`: Configuration files

### Pre-Commit Checklist

```bash
# 1. Run linter
cd apps/web && pnpm lint

# 2. Build project
turbo build

# 3. Check TypeScript
cd apps/web && npx tsc --noEmit

# 4. Format code (if Prettier configured)
# pnpm format

# 5. Commit with message
git add .
git commit -m "feat(web): your change description"

# 6. Push to Claude branch
git push -u origin claude/claude-md-mhyf9rxwxon3cq94-018ozNG55dJN3mgYBdtfHxnD
```

### Pull Request Process

**When Creating PR:**

1. **Ensure branch is up to date:**
   ```bash
   git fetch origin main
   git rebase origin/main
   ```

2. **Run full test suite** (when implemented)

3. **Create PR with template:**
   ```markdown
   ## Summary
   - Added new services page
   - Integrated with FastAPI backend
   - Updated sitemap

   ## Test Plan
   - [ ] Tested locally on http://localhost:3000/services
   - [ ] Verified API endpoint returns data
   - [ ] Checked mobile responsiveness
   - [ ] Validated SEO metadata

   ## Screenshots
   [Attach screenshots if UI changes]

   ## Deployment Notes
   - Requires NEXT_PUBLIC_API_URL env var
   - Database migration needed (see packages/db)
   ```

4. **Request review** from team members

---

## Quick Reference

### Essential Commands

```bash
# Install dependencies
pnpm install

# Start frontend
pnpm dev

# Start backend
pnpm dev:api

# Start all services (Docker)
docker-compose up

# Build all
turbo build

# Lint frontend
cd apps/web && pnpm lint

# View API docs
# http://localhost:8000/docs (after running dev:api)
```

### File Locations

| Purpose | Path |
|---------|------|
| Homepage | `apps/web/src/app/page.tsx` |
| About Page | `apps/web/src/app/about/page.tsx` |
| Contact Page | `apps/web/src/app/contact/page.tsx` |
| API Contact Route | `apps/web/src/app/api/contact/route.ts` |
| FastAPI Main | `apps/api/app/main.py` |
| Contact Endpoint | `apps/api/app/routers/contact.py` |
| Database Schema | `packages/db/schema.prisma` |
| Global Styles | `apps/web/app/globals.css` |
| Sitemap | `apps/web/app/sitemap.ts` |
| Vercel Config | `apps/web/vercel.json` |
| Docker Compose | `docker-compose.yml` |

### Port Reference

| Service | Port | URL |
|---------|------|-----|
| Next.js Dev | 3000 | http://localhost:3000 |
| FastAPI | 8000 | http://localhost:8000 |
| FastAPI Docs | 8000 | http://localhost:8000/docs |
| PostgreSQL | 5432 | localhost:5432 |
| Node.js Debug | 9229 | chrome://inspect |

### Environment Variables

```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

# apps/api/.env
DATABASE_URL=postgresql://esviem:esviem_password@localhost:5432/esviem_db

# Production (Vercel)
NEXT_PUBLIC_API_URL=https://api.esviem.kiev.ua
DATABASE_URL=<production-postgres-url>
```

---

## Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Prisma Docs:** https://www.prisma.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **pnpm Workspaces:** https://pnpm.io/workspaces
- **Turborepo:** https://turbo.build/repo/docs

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2025-11-14 | Initial CLAUDE.md creation | Claude Assistant |

---

**End of CLAUDE.md**

> This document should be updated whenever significant architectural changes occur or new conventions are established.
