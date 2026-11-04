import { UserRound } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Bars use foreground/10 instead of the default bg-muted, which blends into the page background.
const bar = 'bg-foreground/10 motion-reduce:animate-none';

// Same footprint as the card it stands in for so the grid doesn't shift when a speaker is confirmed.
// `tile` mirrors SpeakerTile (/speakers), `featured` mirrors the landing page spotlight card.
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
                'flex h-full flex-col overflow-hidden border border-dashed border-gray-300 bg-white/30 dark:border-gray-700 dark:bg-gray-900/20',
                featured ? 'rounded-3xl' : 'rounded-2xl',
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
                <div className='flex flex-1 flex-col gap-4 p-6'>
                    {/* name + role */}
                    <div className='space-y-2'>
                        <Skeleton className={cn('h-3.5 w-2/5', bar)} />
                        <Skeleton className={cn('h-3.5 w-3/5', bar)} />
                    </div>
                    {/* talk title */}
                    <div className='space-y-2.5'>
                        <Skeleton className={cn('h-5 w-full', bar)} />
                        <Skeleton className={cn('h-5 w-4/5', bar)} />
                    </div>
                    {/* blurb */}
                    <div className='space-y-2'>
                        <Skeleton className={cn('h-3.5 w-full', bar)} />
                        <Skeleton className={cn('h-3.5 w-full', bar)} />
                        <Skeleton className={cn('h-3.5 w-2/3', bar)} />
                    </div>
                    {/* "Read bio and talk" */}
                    <div className='mt-auto border-t pt-4'>
                        <Skeleton className={cn('h-4 w-32', bar)} />
                    </div>
                </div>
            ) : (
                <div className='flex flex-1 flex-col gap-3 p-5'>
                    <div className='space-y-2'>
                        <Skeleton className={cn('h-5 w-2/3', bar)} />
                        <Skeleton className={cn('h-4 w-1/2', bar)} />
                    </div>
                    <div className='mt-auto space-y-2 border-t pt-3'>
                        <Skeleton className={cn('h-4 w-full', bar)} />
                        <Skeleton className={cn('h-4 w-3/4', bar)} />
                    </div>
                </div>
            )}
        </div>
    );
}
