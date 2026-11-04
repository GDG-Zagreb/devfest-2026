import { UserRound } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Bars use foreground/10 instead of the default bg-muted, which blends into the page background.
const bar = 'bg-foreground/10 motion-reduce:animate-none';

// Same footprint as the card it stands in for so the grid doesn't shift when a speaker is confirmed.
// Both variants span rows of their parent grid via subgrid, like the cards they mirror:
// `tile` = SpeakerTile (/speakers, 3 rows), `featured` = landing page spotlight card (5 rows).
// The parent grid has no row gap, so cards and placeholders carry mb-6.
// Decorative only (aria-hidden): the page announces how many speakers are confirmed.
// `className` sizes/hides the card.
export function SpeakerPlaceholder({
    variant = 'tile',
    className,
}: {
    variant?: 'tile' | 'featured';
    className?: string;
}) {
    const featured = variant === 'featured';

    return (
        <div
            aria-hidden
            className={cn(
                'overflow-hidden border border-dashed border-gray-300 bg-white/30 dark:border-gray-700 dark:bg-gray-900/20',
                'mb-6 grid grid-rows-subgrid',
                featured ? 'row-span-5 rounded-3xl' : 'row-span-3 rounded-2xl',
                className
            )}
        >
            <div
                className={cn(
                    'relative flex w-full items-center justify-center bg-muted/60',
                    featured ? 'aspect-4/5' : 'aspect-square'
                )}
            >
                <UserRound
                    className='h-1/3 w-1/3 text-muted-foreground/30'
                    strokeWidth={1.25}
                />
                <span className='absolute bottom-3 left-3 rounded-full border bg-background/80 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur-sm'>
                    To be announced
                </span>
            </div>

            {featured ? (
                <>
                    {/* name + role row */}
                    <div className='space-y-2 px-6 pt-6'>
                        <Skeleton className={cn('h-3.5 w-2/5', bar)} />
                        <Skeleton className={cn('h-3.5 w-3/5', bar)} />
                    </div>
                    {/* talk title row */}
                    <div className='space-y-2.5 px-6 pt-4'>
                        <Skeleton className={cn('h-5 w-full', bar)} />
                        <Skeleton className={cn('h-5 w-4/5', bar)} />
                    </div>
                    {/* blurb row */}
                    <div className='space-y-2 px-6 pt-4'>
                        <Skeleton className={cn('h-3.5 w-full', bar)} />
                        <Skeleton className={cn('h-3.5 w-full', bar)} />
                        <Skeleton className={cn('h-3.5 w-2/3', bar)} />
                    </div>
                    {/* "Read bio and talk" row */}
                    <div className='mx-6 mb-6 mt-4 border-t pt-4'>
                        <Skeleton className={cn('h-4 w-32', bar)} />
                    </div>
                </>
            ) : (
                <>
                    {/* name + role row */}
                    <div className='space-y-2 px-5 pb-3 pt-5'>
                        <Skeleton className={cn('h-5 w-2/3', bar)} />
                        <Skeleton className={cn('h-4 w-1/2', bar)} />
                    </div>
                    {/* talk title row */}
                    <div className='mx-5 mb-5 space-y-2 border-t pt-3'>
                        <Skeleton className={cn('h-4 w-full', bar)} />
                        <Skeleton className={cn('h-4 w-3/4', bar)} />
                    </div>
                </>
            )}
        </div>
    );
}
