import type { Metadata } from 'next';

import { SpeakerPlaceholder } from '@/components/speakers/speaker-placeholder';
import { SpeakerTile, type SpeakerEntry } from '@/components/speakers/speaker-tile';
import speakersData from '@/json/speakers.json';

export const metadata: Metadata = {
    title: 'Speakers | DevFest Croatia 2026',
    description:
        'Meet the speakers of DevFest Croatia 2026 and find out more about their talks.',
};

// Expected lineup size. Unconfirmed slots render as placeholders until speakers are added.
const SPEAKER_SLOTS = 12;

const Speakers = () => {
    const speakers: SpeakerEntry[] = speakersData.speakers.filter(
        (speaker) => speaker.isPublishable === true
    );
    const placeholders = Math.max(0, SPEAKER_SLOTS - speakers.length);

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
                {placeholders > 0 && (
                    <p className='mt-2 text-sm font-medium text-foreground'>
                        {speakers.length} of {SPEAKER_SLOTS} speakers announced.
                        More coming soon.
                    </p>
                )}
            </div>

            <div className='mx-auto grid max-w-6xl grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3'>
                {speakers.map((speaker, index) => (
                    <SpeakerTile
                        key={speaker.speakerName}
                        speaker={speaker}
                        index={index}
                        priority={index < 3}
                    />
                ))}
                {Array.from({ length: placeholders }, (_, index) => (
                    <SpeakerPlaceholder key={`placeholder-${index}`} />
                ))}
            </div>
        </section>
    );
};

export default Speakers;
