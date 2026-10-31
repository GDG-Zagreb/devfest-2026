import type { Metadata } from 'next';

import { SpeakerTile, type SpeakerEntry } from '@/components/speakers/speaker-tile';
import speakersData from '@/json/speakers.json';

export const metadata: Metadata = {
    title: 'Speakers | DevFest Croatia 2026',
    description:
        'Meet the speakers of DevFest Croatia 2026 and find out more about their talks.',
};

const Speakers = () => {
    const speakers: SpeakerEntry[] = speakersData.speakers.filter(
        (speaker) => speaker.isPublishable === true
    );

    return (
        <section className='container mx-auto px-4 py-16'>
            <div className='mx-auto mb-12 max-w-3xl text-center'>
                <span className='inline-flex items-center rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-blue'>
                    Speakers
                </span>
                <h1 className='mt-4 text-4xl font-bold md:text-5xl'>
                    Meet the speakers
                </h1>
                <p className='mt-4 text-muted-foreground'>
                    The people behind this year&apos;s talks. Select a speaker to
                    read their bio and the full talk description.
                </p>
            </div>

            <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {speakers.map((speaker, index) => (
                    <SpeakerTile
                        key={speaker.speakerName}
                        speaker={speaker}
                        index={index}
                        priority={index < 3}
                    />
                ))}
            </div>
        </section>
    );
};

export default Speakers;
