'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

const ImageGallery = () => {
    const [open, setOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    // Reordered for optimal masonry layout
    const images = [
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

    const slides = images.map((src) => ({ src }));

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setOpen(true);
    };

    return (
        <div className='w-full max-w-[1020px] mx-auto'>
            <h1 className='text-center text-2xl md:text-3xl font-bold mb-6 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'>
                Snaps from DevFest 2025
            </h1>

            {/* Mobile: 1 column layout */}
            <div className='grid grid-cols-1 gap-4 sm:hidden'>
                {images.map((src, index) => (
                    <div
                        key={index}
                        className='w-full h-[300px] relative overflow-hidden rounded-lg shadow-lg cursor-pointer group'
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={src}
                            alt={`DevFest 2025 gallery image ${index + 1}`}
                            fill
                            className='object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none'
                            sizes="100vw"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        />
                        <div className='absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
                    </div>
                ))}
            </div>

            {/* Desktop: Grid layout with featured images */}
            <div className='hidden sm:block'>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]'>
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group ${
                                index === 4 || index === 9 ? 'row-span-2' : ''
                            }`}
                            onClick={() => openLightbox(index)}
                        >
                            <div className='relative h-full'>
                                <Image
                                    src={src}
                                    alt={`DevFest 2025 gallery image ${index + 1}`}
                                    fill
                                    className='object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none'
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                                />
                                <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={photoIndex}
                slides={slides}
                styles={{
                    container: { backgroundColor: 'rgba(0, 0, 0, .95)' },
                }}
                animation={{ fade: 300 }}
                controller={{ closeOnBackdropClick: true }}
            />
        </div>
    );
};

export default ImageGallery;
