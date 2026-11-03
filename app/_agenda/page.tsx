'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import enter from '@/json/archive/2025/enter.json';
import shift from '@/json/archive/2025/shift.json';
import { enhanceScheduleWithSpeakers } from '@/lib/speaker-utils';
import Link from 'next/link';
import AgendaItem from '@/components/AgendaItem';

export default function Agenda() {
    // Enhance schedules with speaker data from 2025 archive
    const enhancedEnterTalks = enhanceScheduleWithSpeakers(enter.talks, '2025');
    const enhancedShiftTalks = enhanceScheduleWithSpeakers(shift.talks, '2025');

    return (
        <div className='container flex flex-col items-center px-4 p-10'>
            <h1 className='mt-3 mb-6 text-4xl font-bold'>
                DevFest Zagreb 2025 Agenda
            </h1>
            <h2 className='mt-3 mb-6 text-2xl font-bold'>
                Want to know more about talks and speakers? Check &nbsp;
                <Link href={'/speakers'}>
                    <span className='underline'>here</span>
                </Link>
            </h2>
            <Tabs defaultValue='enter' className='w-full lg:w-4/5'>
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='enter'>Stage &ldquo;Enter&rdquo;</TabsTrigger>
                    <TabsTrigger value='shift'>Stage &ldquo;Shift&rdquo;</TabsTrigger>
                </TabsList>
                <TabsContent value='enter'>
                    <div className='flex flex-col gap-3'>
                        {enhancedEnterTalks.map((talk) => {
                            return <AgendaItem talk={talk} key={talk.id} />;
                        })}
                    </div>
                </TabsContent>
                <TabsContent value='shift'>
                    <div className='flex flex-col gap-3'>
                        {enhancedShiftTalks.map((talk) => {
                            return <AgendaItem talk={talk} key={talk.id} />;
                        })}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
