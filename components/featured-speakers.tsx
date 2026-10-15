'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useState } from 'react';
import speakers from '@/json/speakers.json';

type Speaker = {
    type: string;
    speakerName: string;
    speakerInfo: string;
    name: string;
    info: string;
    imgSrc: string;
    isFeatured: boolean;
    isPublishable: boolean;
};

// Helper component for expandable text
function ExpandableText({ text, className, maxLines = 3 }: { text: string; className?: string; maxLines?: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldTruncate = text.length > 150; // Rough character estimate for truncation

    // Get the appropriate line-clamp class
    const getLineClampClass = () => {
        if (isExpanded || !shouldTruncate) return '';
        switch (maxLines) {
            case 1: return 'line-clamp-1';
            case 2: return 'line-clamp-2';
            case 3: return 'line-clamp-3';
            case 4: return 'line-clamp-4';
            case 5: return 'line-clamp-5';
            case 6: return 'line-clamp-6';
            default: return 'line-clamp-3';
        }
    };

    return (
        <div>
            <p className={`${className} ${getLineClampClass()} leading-relaxed`}>
                {text}
            </p>
            {shouldTruncate && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='text-purple-600 dark:text-purple-400 text-sm font-medium hover:text-purple-700 dark:hover:text-purple-300 mt-2 transition-colors'
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    );
}

export default function FeaturedSpeakers() {
    const featuredSpeakers = speakers.speakers.filter((speaker: Speaker) => speaker.isFeatured);

    // Don't render anything if no featured speakers
    if (featuredSpeakers.length === 0) {
        return null;
    }

    // Determine layout type based on speaker count
    const speakerCount = featuredSpeakers.length;
    
    const renderSingleSpeakerLayout = () => (
        <div className='mb-8'>
            {featuredSpeakers.map((featuredSpeaker: Speaker) => (
                <div
                    key={featuredSpeaker.speakerName}
                    className='bg-linear-to-r from-white via-gray-50 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-600 hover:shadow-2xl transition-all duration-300'
                >
                    <div className='flex flex-col lg:flex-row items-center lg:items-start gap-8'>
                        <div className='shrink-0'>
                            <div className='relative'>
                                <Image
                                    src={featuredSpeaker.imgSrc}
                                    alt={featuredSpeaker.speakerName}
                                    width={150}
                                    height={150}
                                    className='w-[150px] h-[150px] rounded-full object-cover border-6 border-white dark:border-gray-600 shadow-2xl'
                                />
                                <div className='absolute -bottom-2 -right-2 bg-linear-to-r from-purple-500 to-blue-500 rounded-full p-2 shadow-lg'>
                                    <Users className='w-5 h-5 text-white' />
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 text-center lg:text-left space-y-4'>
                            <div>
                                <h3 className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2'>
                                    {featuredSpeaker.speakerName}
                                </h3>
                                <p className='text-lg text-gray-600 dark:text-gray-400 font-medium'>
                                    {featuredSpeaker.speakerInfo}
                                </p>
                            </div>
                            <div className='bg-linear-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700'>
                                <h4 className='text-xl font-bold text-gray-800 dark:text-gray-200 mb-2'>
                                    {featuredSpeaker.name}
                                </h4>
                                <ExpandableText 
                                    text={featuredSpeaker.info}
                                    className='text-gray-700 dark:text-gray-300'
                                    maxLines={3}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderTwoSpeakersLayout = () => (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
            {featuredSpeakers.map((speaker: Speaker) => (
                <div
                    key={speaker.speakerName}
                    className='bg-linear-to-br from-white via-gray-50 to-purple-50 dark:from-gray-700 dark:via-gray-800 dark:to-purple-900/20 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-600 hover:shadow-2xl transition-all duration-300 self-start min-h-[450px]'
                >
                    <div className='flex flex-col items-center text-center space-y-4'>
                        <div className='relative'>
                            <Image
                                src={speaker.imgSrc}
                                alt={speaker.speakerName}
                                width={120}
                                height={120}
                                className='w-[120px] h-[120px] rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg'
                            />
                        </div>
                        <div>
                            <h3 className='text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2'>
                                {speaker.speakerName}
                            </h3>
                            <p className='text-base text-gray-600 dark:text-gray-400 font-medium mb-4'>
                                {speaker.speakerInfo}
                            </p>
                        </div>
                        <div className='bg-linear-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-4 w-full'>
                            <h4 className='text-lg font-bold text-gray-800 dark:text-gray-200 mb-2'>
                                {speaker.name}
                            </h4>
                            <ExpandableText
                                text={speaker.info}
                                className='text-sm text-gray-700 dark:text-gray-300'
                                maxLines={3}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderThreeSpeakersLayout = () => (
        <div className='space-y-8 mb-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='bg-linear-to-r from-white via-purple-50 to-white dark:from-gray-700 dark:via-purple-900/10 dark:to-gray-700 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-600'>
                    <div className='flex flex-col md:flex-row items-center gap-6'>
                        <div className='shrink-0'>
                            <Image
                                src={featuredSpeakers[0].imgSrc}
                                alt={featuredSpeakers[0].speakerName}
                                width={120}
                                height={120}
                                className='w-[120px] h-[120px] rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg'
                            />
                        </div>
                        <div className='flex-1 text-center md:text-left'>
                            <h3 className='text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1'>
                                {featuredSpeakers[0].speakerName}
                            </h3>
                            <p className='text-gray-600 dark:text-gray-400 mb-3'>
                                {featuredSpeakers[0].speakerInfo}
                            </p>
                            <div className='bg-linear-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-3'>
                                <p className='font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2'>
                                    {featuredSpeakers[0].name}
                                </p>
                                <ExpandableText 
                                    text={featuredSpeakers[0].info}
                                    className='text-xs text-gray-600 dark:text-gray-400'
                                    maxLines={2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {featuredSpeakers.slice(1).map((speaker: Speaker) => (
                    <div
                        key={speaker.speakerName}
                        className='bg-linear-to-b from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 self-start min-h-[380px]'
                    >
                        <div className='flex flex-col items-center text-center'>
                            <Image
                                src={speaker.imgSrc}
                                alt={speaker.speakerName}
                                width={100}
                                height={100}
                                className='w-[100px] h-[100px] rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg mb-4'
                            />
                            <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200 mb-1'>
                                {speaker.speakerName}
                            </h3>
                            <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                                {speaker.speakerInfo}
                            </p>
                            <div className='bg-linear-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-3 w-full'>
                                <p className='text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                                    {speaker.name}
                                </p>
                                <ExpandableText
                                    text={speaker.info}
                                    className='text-xs text-gray-600 dark:text-gray-400'
                                    maxLines={2}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderGridLayout = () => (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {featuredSpeakers.map((speaker: Speaker) => (
                <div
                    key={speaker.speakerName}
                    className='bg-linear-to-b from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-105 self-start min-h-[420px]'
                >
                    <div className='flex flex-col items-center text-center'>
                        <div className='relative mb-4'>
                            <Image
                                src={speaker.imgSrc}
                                alt={speaker.speakerName}
                                width={80}
                                height={80}
                                className='w-[80px] h-[80px] rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg'
                            />
                        </div>
                        <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200 mb-1'>
                            {speaker.speakerName}
                        </h3>
                        <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2'>
                            {speaker.speakerInfo}
                        </p>
                        <div className='bg-linear-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-3 w-full'>
                            <p className='text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                                {speaker.name}
                            </p>
                            <ExpandableText
                                text={speaker.info}
                                className='text-xs text-gray-600 dark:text-gray-400'
                                maxLines={2}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className='w-full max-w-[1020px] mx-auto mt-12'>
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xs rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700'>
                <div className='text-center mb-8'>
                    <div className='flex items-center justify-center gap-3 mb-4'>
                        <Users className='w-8 h-8 text-purple-600' />
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200'>
                            Featured Speakers
                        </h2>
                    </div>
                    <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                        Meet some of the amazing experts who will be sharing their knowledge at DevFest 2025
                    </p>
                </div>

{speakerCount === 1 && renderSingleSpeakerLayout()}
                {speakerCount === 2 && renderTwoSpeakersLayout()}
                {speakerCount === 3 && renderThreeSpeakersLayout()}
                {speakerCount >= 4 && renderGridLayout()}

                <div className='text-center'>
                    <Link href='/speakers' className='inline-block'>
                        <Button className='h-14 px-8 rounded-2xl text-lg font-semibold bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl transform transition-all duration-300 hover:scale-105'>
                            <Users className='mr-3 w-5 h-5' />
                            Meet All Speakers
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}