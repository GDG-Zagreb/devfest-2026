'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog';
import { SpeakerPlaceholder } from '@/components/speakers/speaker-placeholder';
import {
    accents,
    SpeakerDetails,
    type SpeakerEntry,
} from '@/components/speakers/speaker-tile';
import speakersData from '@/json/speakers.json';
import { cn } from '@/lib/utils';

const MAX_FEATURED = 3;

// isPublishable is required as well, so an embargoed speaker never leaks onto the landing page.
const featuredSpeakers: SpeakerEntry[] = speakersData.speakers
    .filter((speaker) => speaker.isFeatured && speaker.isPublishable)
    .slice(0, MAX_FEATURED);

// Row widths: 1 column on mobile, 2 from md, 3 from lg (gaps are 1.5rem).
const CARD_WIDTH = 'w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]';

// Placeholders only fill the row the cards sit in, so they never add vertical scrolling on small screens.
// Slots 0-1 exist in the 2-column (md) row, slot 2 only in the 3-column (lg) row; mobile shows none.
const placeholderSlots = Array.from(
    { length: MAX_FEATURED - featuredSpeakers.length },
    (_, offset) => featuredSpeakers.length + offset
);

export default function FeaturedSpeakers() {
    if (featuredSpeakers.length === 0) {
        return null;
    }

    return (
        <section className='py-16'>
            <div className='mx-auto max-w-6xl'>
                <div className='mx-auto mb-12 max-w-3xl text-center'>
                    <span className='inline-flex items-center rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-blue'>
                        Speakers
                    </span>
                    <h2 className='mt-4 text-3xl font-bold md:text-4xl'>
                        Featured speakers
                    </h2>
                    <p className='mt-4 text-muted-foreground'>
                        A first look at who is taking the stage. Select a
                        speaker to read their bio and the full talk
                        description.
                    </p>
                </div>

                <div className='flex flex-wrap justify-center gap-6'>
                    {featuredSpeakers.map((speaker, index) => {
                        const accent = accents[index % accents.length];

                        return (
                            <Dialog key={speaker.speakerName}>
                                <DialogTrigger asChild>
                                    <button
                                        type='button'
                                        className={cn(
                                            'group flex w-full flex-col overflow-hidden rounded-3xl border bg-white/60 text-left transition-colors focus:outline-hidden focus-visible:ring-2 dark:bg-gray-900/40',
                                            CARD_WIDTH,
                                            accent.card
                                        )}
                                    >
                                        <div className='relative aspect-4/5 w-full overflow-hidden bg-muted'>
                                            <Image
                                                src={speaker.imgSrc}
                                                alt={speaker.speakerName}
                                                fill
                                                sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                                                className='object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100'
                                            />
                                            <div
                                                aria-hidden
                                                className='absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent'
                                            />
                                            <span
                                                className={cn(
                                                    'absolute bottom-4 left-4 inline-flex items-center rounded-full border bg-background/90 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm',
                                                    accent.text
                                                )}
                                            >
                                                {speaker.type}
                                            </span>
                                        </div>
                                        <div className='flex flex-1 flex-col gap-4 p-6'>
                                            <div>
                                                <span className='block text-sm font-semibold'>
                                                    {speaker.speakerName}
                                                </span>
                                                <span className='mt-0.5 block text-sm text-muted-foreground'>
                                                    {speaker.speakerInfo}
                                                </span>
                                            </div>
                                            <h3 className='line-clamp-3 text-xl font-bold leading-tight'>
                                                {speaker.name}
                                            </h3>
                                            <p className='line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
                                                {speaker.info}
                                            </p>
                                            <span
                                                className={cn(
                                                    'mt-auto inline-flex items-center gap-1.5 border-t pt-4 text-sm font-semibold',
                                                    accent.text
                                                )}
                                            >
                                                Read bio and talk
                                                <ArrowUpRight
                                                    className='h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none'
                                                    aria-hidden
                                                />
                                            </span>
                                        </div>
                                    </button>
                                </DialogTrigger>

                                <DialogContent>
                                    <SpeakerDetails
                                        speaker={speaker}
                                        accent={accent}
                                    />
                                </DialogContent>
                            </Dialog>
                        );
                    })}
                    {placeholderSlots.map((slot) => (
                        <SpeakerPlaceholder
                            key={`placeholder-${slot}`}
                            variant='featured'
                            className={cn(
                                'h-auto',
                                CARD_WIDTH,
                                slot < 2 ? 'hidden md:flex' : 'hidden lg:flex'
                            )}
                        />
                    ))}
                </div>

                <div className='mt-12 text-center'>
                    <Button asChild size='lg' variant='outline' className='rounded-2xl'>
                        <Link href='/speakers'>
                            See all speakers
                            <ArrowRight className='ml-2 h-4 w-4' aria-hidden />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
