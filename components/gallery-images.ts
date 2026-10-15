// Shared source of truth for the DevFest 2025 gallery.
// Consumed by both ImageGallery (enlarged mosaic) and ImageMarquee (edge-to-edge band).
export const galleryImages = [
    '/gallery/2025/20251024_113931.webp',
    '/gallery/2025/IMG_0804.webp',
    '/gallery/2025/++20251024_105120.webp',
    '/gallery/2025/20251024_171440.webp',
    '/gallery/2025/IMG_2030.webp',
    '/gallery/2025/20251024_131718.webp',
    '/gallery/2025/++20251024_100819.webp',
    '/gallery/2025/20251024_170435.webp',
    '/gallery/2025/IMG_0793.webp',
    '/gallery/2025/++20251024_165550.webp',
    '/gallery/2025/20251024_171646(0).webp',
    '/gallery/2025/IMG-20251024-WA0007.webp',
    '/gallery/2025/20251024_165557.webp',
];

// Transparent 1x1 SVG blur placeholder (keeps CLS at zero without per-image LQIP).
export const blurDataUrl =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';
