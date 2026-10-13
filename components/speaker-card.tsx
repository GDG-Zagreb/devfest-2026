import { Suspense } from 'react';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

type SpeakerCardProps = {
    session: {
        type: string;
        time?: string;
        speakerName: string;
        imgSrc: string;
        speakerInfo: string;
        name: string;
        info: string;
    };
};

export default function SpeakerCard({ session }: SpeakerCardProps) {
    return (
        <Accordion
            type='single'
            collapsible
            defaultValue='item'
            className='w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800/50 backdrop-blur-xs'
        >
            <AccordionItem value='item' className='border-none'>
                <AccordionTrigger className='hover:no-underline p-6 pb-4 data-[state=open]:pb-4'>
                    <div className='flex flex-col sm:flex-row gap-4 w-full text-left'>
                        {/* Speaker Info Section */}
                        <div className='flex items-center gap-4 flex-1 min-w-0'>
                            <Suspense
                                fallback={
                                    <Skeleton className='w-16 h-16 sm:w-20 sm:h-20 rounded-full shrink-0' />
                                }
                            >
                                <Image
                                    src={session.imgSrc}
                                    alt={session.speakerName}
                                    width={80}
                                    height={80}
                                    className='w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shrink-0 border-2 border-gray-200 dark:border-gray-600'
                                />
                            </Suspense>
                            <div className='flex flex-col gap-1 min-w-0 flex-1'>
                                <Badge 
                                    variant='secondary' 
                                    className='text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 w-fit'
                                >
                                    {session.type}
                                </Badge>
                                <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 truncate'>
                                    {session.speakerName}
                                </h3>
                                <p className='text-sm text-muted-foreground'>
                                    {session.speakerInfo}
                                </p>
                                {session.time && (
                                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                                        <Clock className='w-3 h-3' />
                                        {session.time}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Talk Title Section */}
                        <div className='flex-1 min-w-0 sm:max-w-md flex items-center'>
                            <h4 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 leading-tight'>
                                {session.name}
                            </h4>
                        </div>
                    </div>
                </AccordionTrigger>
                
                <AccordionContent className='px-6 pb-6 pt-2'>
                    <div className='bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h5 className='font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm uppercase tracking-wide'>
                            Talk Description
                        </h5>
                        <p className='text-sm leading-relaxed text-gray-700 dark:text-gray-300'>
                            {session.info}
                        </p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}