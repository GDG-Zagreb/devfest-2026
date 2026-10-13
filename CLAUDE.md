# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16** website for the **DevFest Croatia 2026** conference organized by GDG Zagreb. The site showcases speakers, agenda, sponsors, and provides information about the annual DevFest Croatia conference.

## Development Commands

- **Development**: `npm run dev` - Start development server at http://localhost:3000
- **Build**: `npm run build` - Create production build
- **Production**: `npm start` - Start production server  
- **Lint**: `npm run lint` - Run ESLint checks

## Architecture & Structure

### Next.js App Router Architecture
- **App Directory Structure**: Uses Next.js App Router (`/app` directory)
- **Layout**: Root layout in `app/layout.tsx` with global theme provider
- **Pages**: Route-based pages (e.g., `app/speakers/page.tsx`, `app/agenda/page.tsx`)
- **Archive System**: Historical data organized in `/app/archive/[year]/` directories

### Component Organization
- **UI Components**: Shadcn/UI components in `/components/ui/`
- **Custom Components**: Application-specific components in `/components/`
- **Site Layout**: Header (`site-header.tsx`) and Footer (`site-footer.tsx`)

### Data Management
- **JSON Data**: Static data stored in `/json/` directory
- **Archive Data**: Historical conference data in `/json/archive/[year]/`
- **Configuration**: Site config in `/config/site.ts`

### Styling Architecture
- **Tailwind CSS**: Primary styling framework with custom configuration
- **Theme System**: Dark/light mode support via `next-themes`
- **Design System**: Shadcn/UI components with custom color schemes
- **CSS Variables**: Theme-aware color system using HSL variables

### Key Features
1. **Multi-year Archive**: Conference data organized by year (2023, 2024, 2025)
2. **Speaker Management**: Speaker profiles with photos and bio data
3. **Agenda System**: Event scheduling and session management  
4. **Sponsorship**: Sponsor showcase and partnership information
5. **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Key Dependencies

### Core Framework
- **Next.js 15**: React framework with App Router
- **React 18**: Latest React with client/server components
- **TypeScript**: Full type safety

### UI & Styling  
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Pre-built accessible components
- **Radix UI**: Headless component primitives
- **Framer Motion**: Animation library
- **Lucide React**: Icon system

### Development Tools
- **ESLint**: Code linting with Next.js config
- **PostCSS**: CSS processing
- **Sharp**: Image optimization

## Component Patterns

### Data Loading Pattern
```typescript
// Components import JSON data directly
import speakers from '@/json/speakers.json';
import { siteConfig } from '@/config/site';
```

### Theme Integration
```typescript
// Use theme-aware components
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
```

### Path Aliases
- `@/components` → `/components`
- `@/lib` → `/lib`  
- `@/config` → `/config`
- `@/json` → `/json`

## File Conventions

- **Component Files**: PascalCase `.tsx` files
- **Page Files**: `page.tsx` in app directory routes
- **Data Files**: JSON files in `/json/` with structured data
- **Config Files**: TypeScript files in `/config/` directory

## Important Notes

- **No Test Framework**: No testing setup currently configured
- **Static Generation**: Designed for static site generation
- **Multi-year Data**: Always consider archive structure when adding new year data
- **Theme Consistency**: Follow existing color scheme and component patterns
- **Image Optimization**: Images stored in `/public/` with Next.js Image component