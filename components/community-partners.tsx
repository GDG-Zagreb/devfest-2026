'use client';

import Image from 'next/image';

type Partner = {
    name: string;
    logo: string;
    website?: string;
    /**
     * The partner cards use a light background in both themes. Set this for
     * logos that ship as white (e.g. RIT Croatia's footer logo) so they stay
     * visible on the light card.
     */
    invertOnCard?: boolean;
};

export default function CommunityPartners() {
    // Card height - matches sponsors component
    const CARD_HEIGHT = 'h-[200px]';

    const partners: Partner[] = [
        {
            name: 'RIT Croatia',
            logo: '/partners/2026/rit-croatia-logo.svg',
            website: 'https://www.croatia.rit.edu/',
            invertOnCard: true,
        },
    ];

    return (
        <section className='py-16'>
            <div className='w-full max-w-[1020px] mx-auto space-y-6'>
                {/* Header */}
                <div className='text-center space-y-1'>
                    <h2 className='text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-500'>
                        Community Partners
                    </h2>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                        Together with our community partners, we create amazing experiences
                    </p>
                </div>

            {/* Partners Grid */}
            <div className='flex flex-wrap justify-center gap-6'>
                {partners.map((partner) => {
                    // Apply 90% scale to Tabu logo, 80% to all logos for smaller size
                    const logoScale = partner.name === 'Tabu' ? 0.72 : 0.8; // 0.9 * 0.8 for Tabu
                    const logoStyle = { transform: `scale(${logoScale})` };

                    const content = (
                        <div className={`group relative bg-white dark:bg-gray-200 rounded-2xl p-6 border border-gray-200 dark:border-gray-100 hover:border-gray-400 transition-colors flex items-center justify-center ${CARD_HEIGHT}`}>
                            <div className='relative w-full h-24 flex items-center justify-center' style={logoStyle}>
                                <Image
                                    src={partner.logo}
                                    alt={`${partner.name} logo`}
                                    fill
                                    className={`object-contain p-4 ${partner.invertOnCard ? 'invert' : ''}`}
                                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                                />
                            </div>
                        </div>
                    );

                    // If website is provided, wrap in link
                    if (partner.website) {
                        return (
                            <a
                                key={partner.name}
                                href={partner.website}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='block w-full sm:w-[320px]'
                            >
                                {content}
                            </a>
                        );
                    }

                    // Otherwise, just render the card
                    return <div key={partner.name} className='w-full sm:w-[320px]'>{content}</div>;
                })}

                {/* Become a Community Partner CTA Card */}
                {/* <a
                    href='https://linktr.ee/zagrebgdg'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block'
                >
                    <div className={`group relative bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg border-2 border-dashed border-blue-300 dark:border-blue-600 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${CARD_HEIGHT}`}>
                        <div className='text-center space-y-3'>
                            <Users className='w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto' />
                            <p className='text-lg font-bold text-gray-800 dark:text-gray-200'>
                                Become a Community Partner
                            </p>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                                Join our community network
                            </p>
                        </div>
                    </div>
                </a> */}
                </div>
            </div>
        </section>
    );
}
