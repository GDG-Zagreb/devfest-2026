'use client';

import ImageGallery from '@/components/image-gallery';
import PoweredBy from '@/components/powered-by';
import Sponsors from '@/components/sponsors';
import CommunityPartners from '@/components/community-partners';
import { Button } from '@/components/ui/button';
import GDGZagrebLogo from '@/public/assets/GDG-Zagreb-logo@3x.png';
import SponzorskiPaketi from '@/public/assets/sponzorski-paketi.png';
import GDGKrapinaLogo from '@/public/gdg-krapina-logo.png';
import { MapPin, Sparkles, Users, X, Smartphone, Globe, Cloud } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='relative overflow-hidden'>
            {/* Animated Background Blobs */}
            <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
                <div className='absolute top-0 -left-40 w-96 h-96 bg-[#4285F4]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob' />
                <div className='absolute top-0 -right-40 w-96 h-96 bg-[#EA4335]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000' />
                <div className='absolute -bottom-40 left-1/2 w-96 h-96 bg-[#FBBC04]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000' />
            </div>

            <div className='container mx-auto px-4'>
                {/* Hero Section */}
                <section className='min-h-[90vh] flex items-center justify-center py-20'>
                    <div className='max-w-6xl mx-auto text-center space-y-12'>
                        {/* Floating Badge */}
                        <div className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-[#4285F4]/10 to-[#EA4335]/10 backdrop-blur-xl border border-[#4285F4]/20 shadow-2xl animate-float'>
                            <Sparkles className='w-5 h-5 text-[#4285F4]' />
                            <span className='text-sm font-semibold bg-linear-to-r from-[#4285F4] to-[#EA4335] bg-clip-text text-transparent'>
                                October 2026
                            </span>
                        </div>

                        {/* Main Headline */}
                        <div className='space-y-6'>
                            <h1 className='text-7xl md:text-8xl lg:text-9xl font-black tracking-tight'>
                                <span className='block bg-linear-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent animate-gradient bg-size-[200%_200%]'>
                                    DevFest
                                </span>
                                <span className='block text-6xl md:text-7xl lg:text-8xl mt-2 bg-linear-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent'>
                                    Croatia 2026
                                </span>
                            </h1>

                            <p className='text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed'>
                                Where innovation meets community.
                                <br />
                                <span className='font-semibold bg-linear-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent'>
                                    Be part of something extraordinary.
                                </span>
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        {/* <div className='flex flex-col sm:flex-row items-center justify-center gap-6 pt-8'>
                            <Link
                                href='https://www.entrio.hr/event/devfest-2025-21473'
                                target='_blank'
                                className='group relative'
                            >
                                <div className='absolute -inset-1 bg-linear-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse' />
                                <Button className='relative w-64 h-16 rounded-2xl text-xl font-bold bg-linear-to-r from-[#4285F4] to-[#EA4335] hover:from-[#4285F4]/90 hover:to-[#EA4335]/90 text-white shadow-2xl transform transition-all duration-300 hover:scale-105'>
                                    <Ticket className='mr-3 w-6 h-6' />
                                    Get Tickets
                                </Button>
                            </Link>

                            <Link href='/agenda' className='group'>
                                <Button
                                    variant='outline'
                                    className='w-64 h-16 rounded-2xl text-xl font-semibold border-2 border-[#4285F4]/50 hover:border-[#4285F4] bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl shadow-xl transform transition-all duration-300 hover:scale-105'
                                >
                                    <Calendar className='mr-3 w-6 h-6' />
                                    View Agenda
                                </Button>
                            </Link>
                        </div> */}

                        {/* Stats Cards */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12'>
                            <div className='group relative overflow-hidden rounded-3xl bg-linear-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40 backdrop-blur-xl border border-[#4285F4]/20 p-8 shadow-2xl hover:shadow-[#4285F4]/50 transition-all duration-500 hover:scale-105'>
                                <div className='absolute inset-0 bg-linear-to-br from-[#4285F4]/0 to-[#4285F4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                                <div className='relative'>
                                    <Users className='w-10 h-10 text-[#4285F4] mb-4' />
                                    <div className='text-4xl font-black bg-linear-to-r from-[#4285F4] to-[#EA4335] bg-clip-text text-transparent'>
                                        10+
                                    </div>
                                    <div className='text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider'>
                                        Expert Speakers
                                    </div>
                                </div>
                            </div>

                            <div className='group relative overflow-hidden rounded-3xl bg-linear-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40 backdrop-blur-xl border border-[#EA4335]/20 p-8 shadow-2xl hover:shadow-[#EA4335]/50 transition-all duration-500 hover:scale-105'>
                                <div className='absolute inset-0 bg-linear-to-br from-[#EA4335]/0 to-[#EA4335]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                                <div className='relative'>
                                    <Sparkles className='w-10 h-10 text-[#EA4335] mb-4' />
                                    <div className='text-4xl font-black bg-linear-to-r from-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent'>
                                        2
                                    </div>
                                    <div className='text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider'>
                                        Parallel Stages
                                    </div>
                                </div>
                            </div>

                            <div className='group relative overflow-hidden rounded-3xl bg-linear-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40 backdrop-blur-xl border border-[#34A853]/20 p-8 shadow-2xl hover:shadow-[#34A853]/50 transition-all duration-500 hover:scale-105'>
                                <div className='absolute inset-0 bg-linear-to-br from-[#34A853]/0 to-[#34A853]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                                <div className='relative'>
                                    <MapPin className='w-10 h-10 text-[#34A853] mb-4' />
                                    <div className='text-4xl font-black bg-linear-to-r from-[#FBBC04] to-[#34A853] bg-clip-text text-transparent'>
                                        Zagreb
                                    </div>
                                    <div className='text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider'>
                                        WESPA Lounge
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Topics Section */}
                <section className='py-20'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-12 md:p-16 shadow-2xl'>
                            <div className='relative text-center space-y-8'>
                                <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300'>
                                    Innovation Across All Platforms
                                </h2>

                                <div className='flex flex-wrap items-center justify-center gap-4 text-xl md:text-2xl font-medium'>
                                    <span className='px-6 py-3 rounded-full bg-[#4285F4]/10 dark:bg-[#4285F4]/20 border border-[#4285F4]/30 text-[#4285F4] dark:text-[#4285F4] shadow-md flex items-center gap-2'>
                                        <Smartphone className='w-5 h-5 md:w-6 md:h-6' />
                                        Mobile
                                    </span>
                                    <span className='px-6 py-3 rounded-full bg-[#EA4335]/10 dark:bg-[#EA4335]/20 border border-[#EA4335]/30 text-[#EA4335] dark:text-[#EA4335] shadow-md flex items-center gap-2'>
                                        <Globe className='w-5 h-5 md:w-6 md:h-6' />
                                        Web
                                    </span>
                                    <span className='px-6 py-3 rounded-full bg-[#FBBC04]/10 dark:bg-[#FBBC04]/20 border border-[#FBBC04]/30 text-[#FBBC04] dark:text-[#FBBC04] shadow-md flex items-center gap-2'>
                                        <Cloud className='w-5 h-5 md:w-6 md:h-6' />
                                        Cloud
                                    </span>
                                    <span className='px-6 py-3 rounded-full bg-[#34A853]/10 dark:bg-[#34A853]/20 border border-[#34A853]/30 text-[#34A853] dark:text-[#34A853] shadow-md flex items-center gap-2'>
                                        <Sparkles className='w-5 h-5 md:w-6 md:h-6' />
                                        AI
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className='py-20'>
                    <ImageGallery />
                </section>

                {/* Location Section */}
                <section className='py-20'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-12 shadow-2xl'>
                            <h2 className='text-2xl md:text-3xl font-semibold text-center mb-4 text-gray-700 dark:text-gray-300'>
                                Location
                            </h2>
                            <Link href='https://wespa.hr/' target='_blank'>
                                <h3 className='text-center mb-12 text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:scale-105 transition-all duration-300'>
                                    WESPA Business & Lounge, Zagreb
                                </h3>
                            </Link>
                            <div className='flex flex-col lg:flex-row gap-8 justify-between w-full'>
                                <div className='w-full lg:w-auto lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl'>
                                    <Image
                                        className='w-full h-full object-cover hover:scale-110 transition-transform duration-700'
                                        src={'/wespa-lounge.jpg'}
                                        alt={'Wespa spaces lounge'}
                                        height={400}
                                        width={400}
                                    />
                                </div>
                                <div className='w-full lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl'>
                                    <iframe
                                        className='w-full h-full'
                                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.4632311407963!2d15.999859577358484!3d45.801980410836315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d7403d03984b%3A0x9e5d18ec57e2bd78!2sWESPA%20Business%20%26%20Lounge!5e0!3m2!1sen!2shr!4v1693745621894!5m2!1sen!2shr'
                                        loading='lazy'
                                        referrerPolicy='no-referrer-when-downgrade'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sponsors Section */}
                <section id="sponsors" className='py-20'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-12 md:p-16 shadow-2xl'>
                            <div className='text-center space-y-8'>
                                <div className='flex flex-col lg:flex-row items-center justify-center gap-4 mb-8 relative'>
                                    <div className='p-4 bg-gray-100 dark:bg-gray-700 rounded-3xl shadow-xl'>
                                        <svg className='w-10 h-10 text-gray-600 dark:text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                        </svg>
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300'>
                                        Become a Sponsor
                                    </h2>

                                    <button
                                        onClick={() => {
                                            if (typeof window !== 'undefined') {
                                                navigator.clipboard.writeText(`${window.location.origin}/#sponsors`);
                                            }
                                        }}
                                        className='absolute top-0 right-0 p-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 opacity-60 hover:opacity-100 rounded-full hover:bg-gray-500/10'
                                        title='Copy link to sponsors section'
                                    >
                                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
                                        </svg>
                                    </button>
                                </div>

                                <div className='max-w-3xl mx-auto space-y-8'>
                                    <p className='text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium'>
                                        Join us in shaping the future of tech in Croatia.
                                        <br />
                                        Showcase your brand to hundreds of passionate developers.
                                    </p>

                                    <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 p-8 shadow-xl'>
                                        <Button
                                            onClick={openModal}
                                            className='w-full max-w-md h-16 rounded-2xl text-xl font-bold bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl transform transition-all duration-300 hover:scale-105 mx-auto block'
                                        >
                                            View Sponsorship Packages
                                        </Button>
                                    </div>

                                    <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/30 backdrop-blur-xl border border-gray-200 dark:border-gray-600 p-6 shadow-lg'>
                                        <div className='flex items-center justify-center gap-3 flex-wrap'>
                                            <svg className='w-6 h-6 text-purple-600 dark:text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                            </svg>
                                            <span className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
                                                Contact us at{' '}
                                                <a
                                                    href='mailto:zagrebgdg@gmail.com'
                                                    className='text-purple-600 dark:text-purple-400 font-bold hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 underline decoration-2 underline-offset-2'
                                                >
                                                    zagrebgdg@gmail.com
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                <section className='py-20'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-12 shadow-2xl'>
                            <h2 className='text-center mb-12 text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300'>
                                Organized by
                            </h2>
                            <div className='flex flex-row items-center justify-center gap-12 flex-wrap'>
                                <Link href={'https://gdg.community.dev/gdg-zagreb/'} className='transform hover:scale-110 transition-transform duration-300'>
                                    <Image
                                        src={GDGZagrebLogo}
                                        alt='GDG Zagreb'
                                        height={50}
                                    />
                                </Link>
                                <Link
                                    href='https://gdg.community.dev/gdg-krapina/'
                                    target='_blank'
                                    className='transform hover:scale-110 transition-transform duration-300'
                                >
                                    <Image
                                        src={GDGKrapinaLogo}
                                        alt='GDG Krapina'
                                        height={140}
                                    />
                                </Link>
                            </div>
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
