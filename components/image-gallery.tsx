'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { blurDataUrl, galleryImages } from '@/components/gallery-images';

// Option A — enlarged in-place mosaic.
// Fills the container width, uses taller 280px rows, and promotes three
// photos to row-span-2 for a magazine-style rhythm. Click any photo to
// open the lightbox.
const ImageGallery = () => {
    const [open, setOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const slides = galleryImages.map((src) => ({ src }));

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setOpen(true);
    };

    // Indices that get the double-height feature treatment.
    const featured = new Set([1, 6, 10]);

    return (
        <div className='w-full'>
            {/* Header */}
            <div className='text-center space-y-1 mb-6'>
                <h2 className='text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-500'>
                    Snapshots
                </h2>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Moments from DevFest Croatia 2025
                </p>
            </div>

            {/* Mobile: single column, generous height */}
            <div className='grid grid-cols-1 gap-3 sm:hidden'>
                {galleryImages.map((src, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => openLightbox(index)}
                        className='relative w-full h-[320px] overflow-hidden rounded-xl cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue'
                        aria-label={`Open photo ${index + 1} of ${galleryImages.length}`}
                    >
                        <Image
                            src={src}
                            alt={`DevFest 2025 gallery image ${index + 1}`}
                            fill
                            className='object-cover group-hover:scale-[1.03] transition-transform duration-500'
                            sizes='100vw'
                            placeholder='blur'
                            blurDataURL={blurDataUrl}
                            quality={85}
                        />
                        <div className='absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    </button>
                ))}
            </div>

            {/* Tablet + desktop: dense mosaic with featured spans */}
            <div
                className='hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 grid-flow-dense'
                style={{ gridAutoRows: '220px' }}
            >
                {galleryImages.map((src, index) => {
                    const isFeature = featured.has(index);
                    return (
                        <button
                            key={index}
                            type='button'
                            onClick={() => openLightbox(index)}
                            className={`relative overflow-hidden rounded-xl cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${isFeature ? 'row-span-2' : ''}`}
                            aria-label={`Open photo ${index + 1} of ${galleryImages.length}`}
                        >
                            <Image
                                src={src}
                                alt={`DevFest 2025 gallery image ${index + 1}`}
                                fill
                                className='object-cover group-hover:scale-[1.03] transition-transform duration-500'
                                sizes={isFeature ? '(max-width: 768px) 50vw, 33vw' : '(max-width: 768px) 50vw, 25vw'}
                                placeholder='blur'
                                blurDataURL={blurDataUrl}
                                quality={isFeature ? 90 : 80}
                                priority={index < 3}
                            />
                            <div className='absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                        </button>
                    );
                })}
            </div>

            {/* Taller rows on wider screens */}
            <style jsx>{`
                @media (min-width: 1024px) {
                    div[style*="gridAutoRows"] { grid-auto-rows: 280px !important; }
                }
            `}</style>

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
