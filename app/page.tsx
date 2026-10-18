'use client';

import ImageMarquee from '@/components/image-marquee';
// Alternate gallery: `@/components/image-gallery` (enlarged in-place mosaic, Option A).
// To swap back, replace the ImageMarquee import above and the <ImageMarquee /> render
// below with their ImageGallery equivalents.
import PoweredBy from '@/components/powered-by';
import Sponsors from '@/components/sponsors';
import CommunityPartners from '@/components/community-partners';
// import { Button } from '@/components/ui/button'; // re-enable with the Get Tickets / sponsorship packages buttons
import DevFestLogo from '@/public/assets/DF26-Logo-Lockup-Primary_With Date.png';
import GDGZagrebLogo from '@/public/assets/GDG-Zagreb-logo@3x.png';
import SponzorskiPaketi from '@/public/assets/sponzorski-paketi.png';
import { MapPin, Sparkles, Users, X, Smartphone, Globe, Cloud, Ticket, Laptop } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Horizontal video for desktop (16:9).
const HERO_VIDEO_ID = 'mLDa5ZLpp0Q';
// Vertical Shorts clip for mobile (9:16).
const HERO_VIDEO_SHORT_ID = '4QwAqwQ6zPs';

// TODO: Replace with the real ticket URL once ticketing goes live,
// then restore the "Get Tickets" button in the hero (replaces the
// "Tickets available soon" announcement).
// const TICKET_URL = '#';

// RIT Croatia Zagreb — venue partner for the 2026 edition.
const RIT_URL = 'https://www.croatia.rit.edu/';
const VENUE_ADDRESS = 'Damira Tomljanovića Gavrana 15, 10000 Zagreb';
const VENUE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=RIT+Croatia+Zagreb+Damira+Tomljanovi%C4%87a+Gavrana+15';
const VENUE_EMBED_URL = 'https://www.google.com/maps?q=RIT+Croatia+Zagreb+Damira+Tomljanovi%C4%87a+Gavrana+15,+Zagreb&output=embed';

const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = () => setIsModalOpen(true); // re-enable with the sponsorship packages button
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='relative overflow-hidden'>
            {/* Ambient Background Blobs — subtle, decorative */}
            <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
                <div className='absolute top-0 -left-40 w-96 h-96 bg-accent-blue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40' />
                <div className='absolute top-0 -right-40 w-96 h-96 bg-accent-red/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40' />
                <div className='absolute -bottom-40 left-1/2 w-96 h-96 bg-accent-yellow/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40' />
            </div>

            <div className='container mx-auto px-4'>
                {/* Hero Section */}
                <section className='py-16 md:py-20'>
                    <div className='max-w-6xl mx-auto w-full space-y-12'>
                        <div className='grid gap-10 lg:grid-cols-2 lg:items-center'>
                            {/* Left: text + CTA */}
                            <div className='text-center lg:text-left space-y-6'>
                                {/* Topic pill */}
                                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20'>
                                    <Sparkles className='w-5 h-5 text-accent-blue' />
                                    <span className='text-sm font-semibold text-accent-blue'>
                                        Mobile, Web, Cloud, AI
                                    </span>
                                </div>

                                {/* Main Headline — primary DevFest 2026 lockup */}
                                <div className='space-y-4'>
                                    <h1 className='sr-only'>DevFest Croatia 2026</h1>
                                    <Image
                                        src={DevFestLogo}
                                        alt='DevFest Croatia 2026 — December 5'
                                        priority
                                        placeholder='blur'
                                        className='w-full max-w-xl h-auto mx-auto lg:mx-0'
                                    />

                                    {/* RIT co-brand */}
                                    <Link
                                        href={RIT_URL}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='group inline-flex items-center justify-center lg:justify-start gap-4 pt-2'
                                    >
                                        <span className='text-xs md:text-sm uppercase tracking-widest text-gray-600 dark:text-gray-400 font-semibold'>
                                            In partnership with
                                        </span>
                                        <Image
                                            src='/partners/2026/rit-croatia-logo.svg'
                                            alt='RIT Croatia'
                                            width={155}
                                            height={26}
                                            className='h-6 w-auto invert dark:invert-0 opacity-85 group-hover:opacity-100 transition-opacity duration-300'
                                        />
                                    </Link>
                                </div>

                                <p className='text-xl md:text-2xl lg:text-3xl font-light text-gray-700 dark:text-gray-300 leading-relaxed'>
                                    Where innovation meets community.
                                    <br />
                                    <span className='font-semibold text-accent-blue'>
                                        Be part of something extraordinary.
                                    </span>
                                    <br />
                                    <span className='font-semibold text-gray-800 dark:text-gray-200'>
                                        December 5, 2026
                                    </span>
                                </p>

                                {/* Tickets availability announcement (replaces the Get Tickets button until ticketing goes live) */}
                                <div className='flex items-center justify-center lg:justify-start pt-2'>
                                    <div className='inline-flex items-center gap-3 px-6 h-14 rounded-2xl bg-accent-blue/5 border border-accent-blue/30'>
                                        <Ticket className='w-5 h-5 text-accent-blue' />
                                        <span className='text-lg md:text-xl font-semibold text-accent-blue'>
                                            Tickets available soon
                                        </span>
                                    </div>
                                </div>
                                {/*
                                <div className='flex items-center justify-center lg:justify-start pt-2'>
                                    <Link
                                        href={TICKET_URL}
                                        target={TICKET_URL === '#' ? undefined : '_blank'}
                                        className='group relative inline-block'
                                    >
                                        <div className='absolute -inset-1 bg-linear-to-r from-accent-blue via-accent-red to-accent-yellow rounded-2xl blur-sm opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse' />
                                        <Button className='relative w-64 h-16 rounded-2xl text-xl font-bold bg-linear-to-r from-accent-blue to-accent-red hover:from-accent-blue/90 hover:to-accent-red/90 text-white shadow-2xl transform transition-all duration-300 hover:scale-105'>
                                            <Ticket className='mr-3 w-6 h-6' />
                                            Get Tickets
                                        </Button>
                                    </Link>
                                </div>
                                */}
                            </div>

                            {/* Right: video — vertical Shorts on mobile, horizontal preview on desktop */}
                            <div className='flex justify-center lg:block'>
                                {/* Mobile: vertical Shorts */}
                                <div className='relative aspect-[9/16] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 bg-black lg:hidden'>
                                    <iframe
                                        className='absolute inset-0 w-full h-full'
                                        src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_SHORT_ID}?rel=0`}
                                        title='DevFest Croatia 2026 — short clip'
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen
                                        loading='lazy'
                                    />
                                </div>
                                {/* Desktop: horizontal preview */}
                                <div className='relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 bg-black hidden lg:block'>
                                    <iframe
                                        className='absolute inset-0 w-full h-full'
                                        src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?rel=0`}
                                        title='DevFest Croatia 2026 preview'
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen
                                        loading='lazy'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto'>
                            <div className='group rounded-2xl bg-white/60 dark:bg-gray-900/40 border border-accent-blue/20 p-5 transition-colors hover:border-accent-blue/50'>
                                <Users className='w-7 h-7 text-accent-blue mb-3' />
                                <div className='text-3xl font-bold text-accent-blue'>
                                    10+
                                </div>
                                <div className='text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-1'>
                                    Expert Speakers
                                </div>
                            </div>

                            <div className='group rounded-2xl bg-white/60 dark:bg-gray-900/40 border border-accent-red/20 p-5 transition-colors hover:border-accent-red/50'>
                                <Sparkles className='w-7 h-7 text-accent-red mb-3' />
                                <div className='text-3xl font-bold text-accent-red'>
                                    2
                                </div>
                                <div className='text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-1'>
                                    Parallel Stages
                                </div>
                            </div>

                            <div className='group rounded-2xl bg-white/60 dark:bg-gray-900/40 border border-accent-yellow/20 p-5 transition-colors hover:border-accent-yellow/50'>
                                <Laptop className='w-7 h-7 text-accent-yellow mb-3' />
                                <div className='text-3xl font-bold text-accent-yellow'>
                                    Hands-on
                                </div>
                                <div className='text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-1'>
                                    Workshops
                                </div>
                            </div>

                            <div className='group rounded-2xl bg-white/60 dark:bg-gray-900/40 border border-accent-green/20 p-5 transition-colors hover:border-accent-green/50'>
                                <MapPin className='w-7 h-7 text-accent-green mb-3' />
                                <div className='text-3xl font-bold text-accent-green'>
                                    Zagreb
                                </div>
                                <div className='text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-1'>
                                    RIT Croatia
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Topics Section */}
                <section className='py-16'>
                    <div className='max-w-6xl mx-auto text-center space-y-6'>
                        <h2 className='text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200'>
                            Innovation Across All Platforms
                        </h2>

                        <div className='flex flex-wrap items-center justify-center gap-3 text-base md:text-lg font-medium'>
                            <span className='px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue flex items-center gap-2'>
                                <Smartphone className='w-4 h-4' />
                                Mobile
                            </span>
                            <span className='px-4 py-2 rounded-full bg-accent-red/10 border border-accent-red/30 text-accent-red flex items-center gap-2'>
                                <Globe className='w-4 h-4' />
                                Web
                            </span>
                            <span className='px-4 py-2 rounded-full bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow flex items-center gap-2'>
                                <Cloud className='w-4 h-4' />
                                Cloud
                            </span>
                            <span className='px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green flex items-center gap-2'>
                                <Sparkles className='w-4 h-4' />
                                AI
                            </span>
                        </div>
                    </div>
                </section>

                {/* Gallery Section — Option B (ImageMarquee, edge-to-edge band) is active.
                    Option A (ImageGallery, enlarged mosaic) lives in `components/image-gallery.tsx`;
                    swap it in by changing the import above and the component below. */}
                <section className='py-16'>
                    <ImageMarquee />
                </section>

                {/* Location Section */}
                <section className='py-16'>
                    <div className='max-w-6xl mx-auto space-y-6'>
                        <div className='text-center space-y-1'>
                            <h2 className='text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200'>
                                Location
                            </h2>
                            <Link href={RIT_URL} target='_blank' rel='noopener noreferrer' className='inline-block'>
                                <h3 className='text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors'>
                                    RIT Croatia Zagreb
                                </h3>
                            </Link>
                            <p className='text-sm md:text-base text-gray-500 dark:text-gray-500'>
                                {VENUE_ADDRESS}
                            </p>
                        </div>
                        <div className='w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800'>
                            <iframe
                                className='w-full h-full'
                                src={VENUE_EMBED_URL}
                                title='Map to RIT Croatia Zagreb'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            />
                        </div>
                        <div className='flex justify-center'>
                            <Link
                                href={VENUE_MAPS_URL}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                            >
                                <MapPin className='w-4 h-4' />
                                Open in Google Maps
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Sponsors Section */}
                <section id="sponsors" className='py-16'>
                    <div className='max-w-3xl mx-auto text-center space-y-5 relative'>
                        <h2 className='text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200'>
                            Become a Sponsor
                        </h2>
                        <button
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    navigator.clipboard.writeText(`${window.location.origin}/#sponsors`);
                                }
                            }}
                            className='absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-500/10'
                            title='Copy link to sponsors section'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
                            </svg>
                        </button>

                        <p className='text-base md:text-lg text-gray-600 dark:text-gray-400'>
                            Join us in shaping the future of tech in Croatia. Showcase your brand to hundreds of passionate developers.
                        </p>

                        {/* Hidden until sponsorship packages are finalized.
                            <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 p-8 shadow-xl'>
                                <Button
                                    onClick={openModal}
                                    className='w-full max-w-md h-16 rounded-2xl text-xl font-bold bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl transform transition-all duration-300 hover:scale-105 mx-auto block'
                                >
                                    View Sponsorship Packages
                                </Button>
                            </div>
                        */}

                        <p className='text-sm md:text-base text-gray-700 dark:text-gray-300'>
                            Contact us at{' '}
                            <a
                                href='mailto:zagrebgdg@gmail.com'
                                className='text-accent-blue font-semibold hover:underline underline-offset-4'
                            >
                                zagrebgdg@gmail.com
                            </a>
                        </p>
                    </div>
                </section>

                {/* Sponsorship Modal */}
                {isModalOpen && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300'>
                        <div className='relative w-full h-full flex items-center justify-center p-4 animate-in zoom-in-95 duration-300'>
                            <button
                                onClick={closeModal}
                                className='absolute top-4 right-4 z-10 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-xs transition-all duration-200 hover:scale-110 animate-in slide-in-from-top-4 duration-300'
                            >
                                <X className='w-8 h-8 text-white' />
                            </button>

                            <div className='relative max-w-7xl max-h-full'>
                                <div className='mb-4 bg-black/70 backdrop-blur-xs rounded-lg p-4 text-white text-center'>
                                    <h3 className='text-xl font-bold mb-2'>DevFest 2026 Sponsorship Packages</h3>
                                    <p className='text-sm opacity-90'>
                                        Ready to become a sponsor? Contact us at{' '}
                                        <a
                                            href='mailto:zagrebgdg@gmail.com'
                                            className='text-blue-300 hover:text-blue-200 font-semibold underline'
                                        >
                                            zagrebgdg@gmail.com
                                        </a>
                                    </p>
                                </div>

                                <Image
                                    src={SponzorskiPaketi}
                                    alt='Sponsorship packages and opportunities for DevFest 2026'
                                    className='w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl'
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Powered By Section */}
                <PoweredBy />

                {/* Sponsors Section */}
                <Sponsors />

                {/* Community Partners Section */}
                <CommunityPartners />

                {/* Organizers Section */}
                <section className='py-16'>
                    <div className='max-w-6xl mx-auto text-center space-y-6'>
                        <h2 className='text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-500'>
                            Organized by
                        </h2>
                        <div className='flex flex-row items-center justify-center gap-12 flex-wrap'>
                            <Link href={'https://gdg.community.dev/gdg-zagreb/'} className='hover:opacity-80 transition-opacity'>
                                <Image
                                    src={GDGZagrebLogo}
                                    alt='GDG Zagreb'
                                    height={50}
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-gradient {
                    animation: gradient 8s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default MainPage;
