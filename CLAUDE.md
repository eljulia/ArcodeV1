# Arcode Web — v2

Landing page + sitio institucional de Arcode — agencia de IA y transformación digital para PYMEs colombianas.

## Comandos

- `npm run dev` — Servidor de desarrollo (http://localhost:3000)
- `npm run build` — Build de producción
- `npm run lint` — ESLint
- `npx vitest run --coverage` — Unit tests con cobertura
- `npx playwright test` — E2E tests
- `npx supabase db push` — Aplicar migraciones SQL
- `npx supabase gen types typescript --project-id=ID > lib/supabase/types.ts` — Regenerar tipos

## Setup inicial

1. Crea un proyecto en supabase.com (región: South America — São Paulo)
2. Copia `.env.example` a `.env.local` y completa las variables
3. Ejecuta `supabase/migrations/001_initial_schema.sql` en Supabase SQL Editor
4. Ejecuta `supabase/seed.sql` para datos demo
5. `npm run dev` → http://localhost:3000

## Tech Stack

Next.js 16 (App Router) + TypeScript strict + Tailwind v4 + shadcn/ui + Framer Motion + Supabase (PostgreSQL) + Vercel

## Arquitectura

- `app/` — App Router: páginas, layouts, API routes
- `components/layout/` — Navbar, Footer, WhatsAppButton
- `components/home/` — 9 secciones del landing (con animaciones Framer Motion)
- `components/shared/` — CaseCard, ServiceCard, ContactForm, AnimateIn
- `hooks/` — useCountUp (contador animado)
- `lib/animations.ts` — Variants de Framer Motion reutilizables
- `lib/supabase/` — client.ts, server.ts, admin.ts, types.ts
- `lib/queries/` — Funciones de consulta por entidad
- `lib/validations/` — Schemas Zod
- `supabase/migrations/` — SQL versionado
- `public/images/` — Imágenes reales de Arcode + logos SVG de herramientas

## Imágenes disponibles

- `Arcode_Bot.jpeg` → Hero principal (dentro de mockup browser)
- `Arcode_Agent.jpeg` → ServicesGrid tabs Chatbots/Flow
- `Arcode_Web.jpeg` → ServicesGrid tabs Web/PYMEs
- `Arcode_AnnDesp.jpeg` → ProblemSection visual "antes vs después"
- `First_Post.jpeg` → AcademyTeaser background con overlay
- `arcode-icon.png` → Navbar isotipo
- `arcode-logo-dark.jpeg` → Footer logo
- `public/images/tools/` → SVGs de n8n, WhatsApp, Supabase, Make

## Flujo de datos

- Server Components → `lib/supabase/server.ts` → Supabase
- API routes → `lib/supabase/admin.ts` → INSERT con service role
- ISR: `revalidate: 3600` en páginas con datos dinámicos

## Reglas No Negociables

1. Sin `any` en TypeScript. Strict mode siempre.
2. Service role key NUNCA en cliente. Solo en API routes y `lib/supabase/admin.ts`.
3. Server Components por defecto. Solo `"use client"` cuando sea necesario (Framer Motion, useState, useRef).
4. WhatsApp siempre visible. FAB en desktop + sticky bar en mobile (ambos en `app/layout.tsx`).
5. Queries a Supabase SIEMPRE a través de `lib/queries/*.ts` — nunca inline.
6. Sin precios en ningún componente de cara al usuario. `/precios` muestra formulario de cotización.
7. `next/image` siempre, nunca `<img>` nativo.
8. Animaciones con `AnimateIn` wrapper o `motion.*` de Framer Motion. Variants en `lib/animations.ts`.

## Colores del Design System

- Primary: `#2563eb` | Navy: `#0a1628` | Surface: `#f8fafc`
- Text: `#0f172a` / `#64748b` | Border: `#e2e8f0` | Success: `#10b981`
- WhatsApp: `#25D366`

## Clases CSS personalizadas (globals.css)

- `.bg-mesh-animated` — gradiente animado (Hero, FinalCTA)
- `.noise-overlay` — textura noise sutil sobre secciones oscuras
- `.text-brand-gradient` — gradiente de texto azul-celeste
