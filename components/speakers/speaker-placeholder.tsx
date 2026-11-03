import { UserRound } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

// Same footprint as SpeakerTile so the grid doesn't shift when a speaker is confirmed.
// Decorative only (aria-hidden): the page announces how many speakers are confirmed.
export function SpeakerPlaceholder() {
    return (
        <div
            aria-hidden
            className='flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-white/30 dark:border-gray-700 dark:bg-gray-900/20'
        >
            <div className='relative flex aspect-square w-full items-center justify-center bg-muted/60'>
                <UserRound
                    className='h-1/3 w-1/3 text-muted-foreground/30'
                    strokeWidth={1.25}
                />
                <span className='absolute bottom-3 left-3 rounded-full border bg-background/80 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur-sm'>
                    To be announced
                </span>
            </div>
            <div className='flex flex-1 flex-col gap-3 p-5'>
                <div className='space-y-2'>
                    <Skeleton className='h-5 w-2/3 motion-reduce:animate-none' />
                    <Skeleton className='h-4 w-1/2 motion-reduce:animate-none' />
                </div>
                <div className='mt-auto space-y-2 border-t pt-3'>
                    <Skeleton className='h-4 w-full motion-reduce:animate-none' />
                    <Skeleton className='h-4 w-3/4 motion-reduce:animate-none' />
                </div>
            </div>
        </div>
    );
}
