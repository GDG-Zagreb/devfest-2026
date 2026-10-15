# DevFest 2025 Zagreb Website

This is the official website for DevFest 2025 Zagreb, built with [Next.js](https://nextjs.org/) and featuring a modern, responsive design with multi-stage conference management.

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
├── app/                 # Next.js 15 App Router pages
│   ├── agenda/         # Conference agenda page
│   ├── speakers/       # Speakers listing page
│   └── archive/        # Historical conference data
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   └── ...            # Custom components
├── json/              # Conference data
│   ├── speakers.json  # Current year speakers database
│   ├── enter.json     # "Enter" stage schedule
│   ├── shift.json     # "Shift" stage schedule
│   └── archive/       # Historical conference data
├── lib/               # Utility functions
└── public/            # Static assets
```

## 📊 Data Architecture

### Speaker and Stage Management

This project uses a **referential data architecture** that eliminates duplication between speaker information and stage schedules. See [`speakers-and-stages.md`](./speakers-and-stages.md) for detailed documentation.

**Key Features:**
- ✅ **Single source of truth** for speaker data
- ✅ **Multi-stage support** (Enter & Shift stages)
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

// enter.json - Stage schedule
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
- **Framer Motion** for animations
- **Next.js Image** optimization

### Featured Components
- **FeaturedSpeakers**: Dynamic layouts (1, 2, 3, 4+ speakers)
- **SpeakerCard**: Modern accordion-style speaker profiles
- **ImageGallery**: Responsive gallery with hover effects
- **AgendaItem**: Clean agenda display with speaker integration

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
- `2025/` - Current year with featured speakers

### Responsive Design
- **Mobile-first** approach
- **Multi-breakpoint** layouts
- **Dark mode** support via next-themes

## 📝 Key Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
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

For questions about DevFest 2025 Zagreb, contact: zagrebgdg@gmail.com

---

**GDG Zagreb** - Organizing DevFest Croatia 2026 🎉