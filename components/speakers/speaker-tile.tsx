'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export type SpeakerEntry = {
    type: string;
    speakerName: string;
    speakerInfo: string;
    name: string;
    info: string;
    imgSrc: string;
    bio?: string;
};

// Static class names so Tailwind can see them at build time
export const accents = [
    {
        card: 'border-accent-blue/20 hover:border-accent-blue/50 focus-visible:ring-accent-blue',
        pill: 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue',
        text: 'text-accent-blue',
    },
    {
        card: 'border-accent-green/20 hover:border-accent-green/50 focus-visible:ring-accent-green',
        pill: 'bg-accent-green/10 border-accent-green/20 text-accent-green',
        text: 'text-accent-green',
    },
    {
        card: 'border-accent-yellow/20 hover:border-accent-yellow/50 focus-visible:ring-accent-yellow',
        pill: 'bg-accent-yellow/10 border-accent-yellow/20 text-accent-yellow',
        text: 'text-accent-yellow',
    },
    {
        card: 'border-accent-red/20 hover:border-accent-red/50 focus-visible:ring-accent-red',
        pill: 'bg-accent-red/10 border-accent-red/20 text-accent-red',
        text: 'text-accent-red',
    },
];

export type Accent = (typeof accents)[number];

type SpeakerTileProps = {
    speaker: SpeakerEntry;
    index: number;
    priority?: boolean;
};

export function SpeakerTile({ speaker, index, priority }: SpeakerTileProps) {
    const accent = accents[index % accents.length];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type='button'
                    className={cn(
                        // Spans 3 rows of the page grid via subgrid (photo / name / talk title), so within a row of
                        // cards the longest name or title sets the height and everything lines up. The page grid
                        // has no row gap; mb-6 is the gap between rows.
                        'group mb-6 row-span-3 grid grid-rows-subgrid overflow-hidden rounded-2xl border bg-white/60 text-left transition-colors focus:outline-hidden focus-visible:ring-2 dark:bg-gray-900/40',
                        accent.card
                    )}
                >
                    <div className='relative aspect-square w-full overflow-hidden bg-muted'>
                        <Image
                            src={speaker.imgSrc}
                            alt={speaker.speakerName}
                            fill
                            sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                            priority={priority}
                            className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
                        />
                    </div>
                    <div className='px-5 pb-3 pt-5'>
                        <span className='block text-lg font-bold leading-tight'>
                            {speaker.speakerName}
                        </span>
                        <span className='mt-1 block text-sm text-muted-foreground'>
                            {speaker.speakerInfo}
                        </span>
                    </div>
                    <div className='mx-5 mb-5 flex items-start justify-between gap-3 border-t pt-3'>
                        <span className='line-clamp-4 text-sm font-medium'>
                            {speaker.name}
                        </span>
                        <ArrowUpRight
                            className={cn(
                                'mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
                                accent.text
                            )}
                            aria-hidden
                        />
                    </div>
                </button>
            </DialogTrigger>

            <DialogContent>
                <SpeakerDetails speaker={speaker} accent={accent} />
            </DialogContent>
        </Dialog>
    );
}

export function SpeakerDetails({
    speaker,
    accent,
}: {
    speaker: SpeakerEntry;
    accent: Accent;
}) {
    return (
        <>
            <div className='flex flex-col gap-6 p-6 sm:flex-row sm:p-8'>
                <div className='relative aspect-square w-40 shrink-0 self-center overflow-hidden rounded-xl bg-muted sm:self-start'>
                    <Image
                        src={speaker.imgSrc}
                        alt={speaker.speakerName}
                        fill
                        sizes='160px'
                        className='object-cover object-top'
                    />
                </div>
                <div className='min-w-0 flex-1'>
                    <DialogTitle>{speaker.speakerName}</DialogTitle>
                    <p className='mt-1 text-sm text-muted-foreground'>
                        {speaker.speakerInfo}
                    </p>
                    {speaker.bio && (
                        <p className='mt-4 text-sm leading-relaxed'>
                            {speaker.bio}
                        </p>
                    )}
                </div>
            </div>

            <div className='border-t bg-muted/40 p-6 sm:p-8'>
                <span
                    className={cn(
                        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                        accent.pill
                    )}
                >
                    {speaker.type}
                </span>
                <h3 className='mt-3 text-xl font-bold leading-tight'>
                    {speaker.name}
                </h3>
                <DialogDescription className='mt-3 text-sm leading-relaxed text-foreground/80'>
                    {speaker.info}
                </DialogDescription>
            </div>
        </>
    );
}
