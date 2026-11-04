# DevFest Croatia 2026 Website

This is the official website for DevFest Croatia 2026 (organized by GDG Zagreb), built with [Next.js](https://nextjs.org/) and featuring a modern, responsive design with a multi-year archive.

## 🚀 Getting Started

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run type-check:watch  # Run type checking in watch mode
```

## 🏗️ Project Structure

```
├── app/                 # Next.js 16 App Router pages
│   ├── page.tsx        # Landing page (incl. featured speakers)
│   ├── speakers/       # Speakers listing page
│   ├── _agenda/        # Agenda page, disabled (underscore = not routed)
│   └── archive/        # Past editions: 2023, 2024, 2025 (speakers + agenda)
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── speakers/      # Speaker tile, detail dialog, placeholder card
│   └── ...            # Custom components
├── config/            # Site config (config/site.ts)
├── json/              # Conference data
│   ├── speakers.json  # Current year speakers database
│   └── archive/       # Past editions: speakers.json + enter.json/shift.json per year
├── lib/               # Utility functions
└── public/            # Static assets (speaker-photos/<year>/ holds speaker photos)
```

## 📊 Data Architecture

### Speaker and Stage Management

This project uses a **referential data architecture** that eliminates duplication between speaker information and stage schedules. See [`speakers-and-stages.md`](./speakers-and-stages.md) for detailed documentation.

**Key Features:**
- ✅ **Single source of truth** for speaker data
- ✅ **Multi-stage support** for past editions (Enter & Shift stages)
- ✅ **Archive system** for historical conferences
- ✅ **Type-safe** speaker references
- ✅ **Easy maintenance** and updates

### Quick Example

```json
// speakers.json - Central database
{
  "speakerName": "Jane Doe",
  "name": "Building Modern Web Apps",
  // ... complete speaker info
}

// archive/<year>/enter.json - Stage schedule
{
  "time": "10:00",
  "speakerRef": "Jane Doe",  // References speaker by name
  "id": 1
}
```

The system automatically merges speaker data with stage schedules at runtime.

## 🎨 UI Components

Built with modern design patterns:
- **shadcn/ui** components for consistent design
- **Tailwind CSS** for responsive styling  
- **Lucide React** icons
- **Radix UI** primitives (dialog, tabs, accordion)
- **Next.js Image** optimization

### Featured Components
- **FeaturedSpeakers**: Landing page spotlight cards for up to 3 speakers with `isFeatured` and `isPublishable`; hidden when there are none, "To be announced" placeholders fill the row on larger screens when there are fewer than 3
- **SpeakerTile / SpeakerDetails / SpeakerPlaceholder** (`components/speakers/`): Speaker card, bio and talk dialog, and placeholder used on `/speakers` and the landing page
- **SpeakerCard**: Accordion-style speaker profiles used by the archive pages
- **ImageGallery / ImageMarquee**: Responsive photo gallery and marquee band
- **AgendaItem**: Agenda display with speaker integration (archive agendas)

## 🛠️ Development Features

### TypeScript Support
Full TypeScript integration with type checking:
```bash
npm run type-check:watch  # Catch type errors during development
```

### Archive System
Supports multiple conference years with backward compatibility:
- `2023/` - Original conference data structure
- `2024/` - Referential speaker system
- `2025/` - Last archived edition (speakers and both stage schedules)

The current edition (2026) lives in `json/speakers.json`. Speakers stay hidden until `isPublishable` is `true`, and `isFeatured` adds them to the landing page (max 3). See [`speakers-and-stages.md`](./speakers-and-stages.md).

### Responsive Design
- **Mobile-first** approach
- **Multi-breakpoint** layouts
- **Dark mode** support via next-themes

## 📝 Key Technologies

- **Next.js 16** - React framework with App Router
- **React 19**
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS 4** - Utility-first styling (configured in CSS, `app/globals.css`)
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives

## 🔧 Configuration Files

- `postcss.config.js` - PostCSS / Tailwind CSS 4 setup
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `CLAUDE.md` - Claude Code development guidelines

## 📚 Documentation

- [`speakers-and-stages.md`](./speakers-and-stages.md) - Detailed explanation of the speaker/stage data architecture
- [`CLAUDE.md`](./CLAUDE.md) - Development guidelines for Claude Code instances

## 🚀 Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Connect your repository to Vercel
2. Configure build settings (auto-detected)
3. Deploy with zero configuration

### Build Process
```bash
npm run build     # Creates optimized production build
npm run start     # Serves production build locally
```

## 🤝 Contributing

1. Follow the TypeScript patterns established in the codebase
2. Use the referential data architecture for speaker management
3. Run type checking before committing: `npm run type-check`
4. Follow the component patterns in `components/` directory
5. Update documentation when making architectural changes

## 📧 Contact

For questions about DevFest Croatia 2026, contact: zagrebgdg@gmail.com

---

**GDG Zagreb** - Organizing DevFest Croatia 2026 🎉