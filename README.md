# ESVIEM Production Skeleton

Mono-repo для сайту ESVIEM (Next.js + FastAPI + PostgreSQL).

## Структура

- `apps/web` — фронтенд (Next.js 14, App Router)
- `apps/api` — бекенд (FastAPI)
- `packages/db` — Prisma схема для PostgreSQL
- `docker-compose.yml` — запуск у контейнерах

## Швидкий старт (dev)

```bash
pnpm install
pnpm dev
```
