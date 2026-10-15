'use client';

import Image from 'next/image';
import { Building2 } from 'lucide-react';

type Sponsor = {
    name: string;
    logo: string;
    website?: string;
};

export default function Sponsors() {
    // Card height - change this value to adjust all card heights
    const CARD_HEIGHT = 'h-[200px]';

    const sponsors: Sponsor[] = [
        {
            name: 'SPAN',
            logo: '/sponsors/2025/01--span-logo.svg',
            website: 'https://span.eu/'
        },
        {
            name: 'A1',
            logo: '/sponsors/2025/02--A1-logo.svg',
            website: 'https://www.a1.hr/'
        },
    ];

    // Helper function to determine grid columns based on sponsor count
    const getGridColumns = () => {
        const totalItems = sponsors.length + (sponsors.length < 3 ? Math.min(2, 3 - sponsors.length) : 0);
        if (totalItems === 1) return 'grid-cols-1';
        if (totalItems === 2) return 'grid-cols-1 md:grid-cols-2';
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    };

    return (
        <div className='w-full max-w-[1020px] mx-auto mt-12'>
            {/* Header */}
            <div className='text-center mb-8'>
                <div className='flex items-center justify-center gap-3 mb-4'>
                    <Building2 className='w-8 h-8 text-purple-600' />
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200'>
                        Our Sponsors in 2025
                    </h2>
                </div>
                <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                    Thank you to our amazing sponsors who make DevFest possible
                </p>
            </div>

            {/* Sponsor Grid */}
            <div className={`grid ${getGridColumns()} gap-6`}>
                    {sponsors.map((sponsor) => {
                        const content = (
                            <div className={`group relative bg-white dark:bg-gray-200 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${CARD_HEIGHT}`}>
                                <div className='relative w-full h-24 flex items-center justify-center'>
                                    <Image
                                        src={sponsor.logo}
                                        alt={`${sponsor.name} logo`}
                                        fill
                                        className='object-contain transition-all duration-300 p-4'
                                        sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                                    />
                                </div>
                            </div>
                        );

                        // If website is provided, wrap in link
                        if (sponsor.website) {
                            return (
                                <a
                                    key={sponsor.name}
                                    href={sponsor.website}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='block'
                                >
                                    {content}
                                </a>
                            );
                        }

                        // Otherwise, just render the card
                        return <div key={sponsor.name}>{content}</div>;
                    })}

                    {/* Add CTA cards if we have less than 3 sponsors */}
                    {sponsors.length < 3 && (
                        <>
                            {Array.from({ length: Math.min(2, 3 - sponsors.length) }).map((_, index) => (
                                <a
                                    key={`cta-${index}`}
                                    href='#sponsors'
                                    className='block'
                                >
                                    <div className={`group relative bg-linear-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 shadow-lg border-2 border-dashed border-purple-300 dark:border-purple-600 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${CARD_HEIGHT}`}>
                                        <div className='text-center space-y-3'>
                                            <Building2 className='w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto' />
                                            <p className='text-lg font-bold text-gray-800 dark:text-gray-200'>
                                                Become a Sponsor
                                            </p>
                                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                                                Missed 2025? Join us at DevFest 2026
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </>
                    )}
            </div>
        </div>
    );
}
