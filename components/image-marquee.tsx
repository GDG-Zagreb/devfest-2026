'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { blurDataUrl, galleryImages } from '@/components/gallery-images';

// Option B — edge-to-edge marquee band.
// Breaks out of the content container with a full-viewport-width
// horizontal snap-scroll strip. Big photos (~440px wide × 540px tall on
// desktop), fade masks on each edge, lightbox on click.
const ImageMarquee = () => {
    const [open, setOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const slides = galleryImages.map((src) => ({ src }));

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setOpen(true);
    };

    return (
        <div className='relative w-screen left-1/2 -translate-x-1/2'>
            {/* Header stays inside the content column visually */}
            <div className='text-center space-y-1 mb-6 px-4'>
                <h2 className='text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-500'>
                    Snapshots
                </h2>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Moments from DevFest Croatia 2025
                </p>
            </div>

            {/* Edge-fade strip */}
            <div className='relative'>
                <div
                    className='pointer-events-none absolute inset-y-0 left-0 w-8 md:w-16 z-10'
                    style={{ background: 'linear-gradient(90deg, var(--color-background), transparent)' }}
                />
                <div
                    className='pointer-events-none absolute inset-y-0 right-0 w-8 md:w-16 z-10'
                    style={{ background: 'linear-gradient(270deg, var(--color-background), transparent)' }}
                />

                <div
                    className='flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-5 px-4 md:px-8 scroll-smooth'
                    role='region'
                    aria-label='DevFest 2025 photo marquee'
                >
                    {galleryImages.map((src, index) => (
                        <button
                            key={index}
                            type='button'
                            onClick={() => openLightbox(index)}
                            className='relative shrink-0 w-[72vw] max-w-[280px] sm:w-[380px] sm:max-w-none h-[460px] md:h-[540px] rounded-2xl overflow-hidden snap-start cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue'
                            aria-label={`Open photo ${index + 1} of ${galleryImages.length}`}
                        >
                            <Image
                                src={src}
                                alt={`DevFest 2025 gallery image ${index + 1}`}
                                fill
                                className='object-cover group-hover:scale-[1.03] transition-transform duration-500'
                                sizes='(max-width: 640px) 72vw, 380px'
                                placeholder='blur'
                                blurDataURL={blurDataUrl}
                                quality={85}
                                priority={index < 2}
                            />
                            <div className='absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                        </button>
                    ))}
                </div>
            </div>

            {/* Scroll affordance */}
            <div className='mt-2 px-4 text-center'>
                <span className='text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500'>
                    Swipe · drag · scroll →
                </span>
            </div>

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

export default ImageMarquee;
