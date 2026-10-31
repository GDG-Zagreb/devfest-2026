import { siteConfig } from '@/config/site';
import { ArrowUpRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';

type PitchYourProjectProps = {
    /** Number of pitch slots; shown as a fact chip only when provided. */
    slots?: number;
    /** Application deadline, e.g. 'November 15, 2026'; shown only when provided. */
    deadline?: string;
};

const steps = [
    {
        title: 'Apply',
        text: 'Tell us about your project or solution in a short form.',
    },
    {
        title: 'Get selected',
        text: 'Selected applicants get a pitch slot on the DevFest stage.',
    },
    {
        title: `Pitch on ${siteConfig.event.date}`,
        text: `Present live at ${siteConfig.event.venue}, ${siteConfig.event.location}.`,
    },
];

export default function PitchYourProject({ slots, deadline }: PitchYourProjectProps) {
    return (
        <section id='pitch' className='scroll-mt-20 py-16'>
            <div className='max-w-6xl mx-auto rounded-3xl border border-accent-yellow/30 bg-accent-yellow/5 p-6 md:p-10'>
                <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
                    {/* Copy + CTA */}
                    <div className='space-y-5 text-center lg:text-left'>
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-yellow/10 border border-accent-yellow/30'>
                            <Lightbulb className='w-5 h-5 text-accent-yellow' />
                            <span className='text-sm font-semibold uppercase tracking-widest text-gray-800 dark:text-gray-200'>
                                Pitch your project
                            </span>
                        </div>

                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100'>
                            Got a project, startup or idea? Pitch it on the DevFest stage.
                        </h2>

                        <p className='text-lg text-gray-700 dark:text-gray-300'>
                            Selected applicants present a lightning pitch of their project or
                            solution to the DevFest community.
                        </p>

                        {(slots !== undefined || deadline) && (
                            <ul className='flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm font-semibold'>
                                {slots !== undefined && (
                                    <li className='px-3 py-1 rounded-full border border-accent-yellow/30 bg-accent-yellow/10'>
                                        {slots} pitch slots
                                    </li>
                                )}
                                {deadline && (
                                    <li className='px-3 py-1 rounded-full border border-accent-yellow/30 bg-accent-yellow/10'>
                                        Applications close {deadline}
                                    </li>
                                )}
                            </ul>
                        )}

                        <Link
                            href={siteConfig.links.pitchForm}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center justify-center gap-2 px-8 h-14 rounded-2xl bg-accent-yellow text-brand-black text-xl font-bold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                        >
                            Apply to pitch
                            <ArrowUpRight className='w-5 h-5' aria-hidden />
                        </Link>
                    </div>

                    {/* Slot card: the 10-minute time-box */}
                    <div className='rounded-2xl bg-white/60 dark:bg-gray-900/40 border border-accent-yellow/30 p-6 space-y-4'>
                        <p className='text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-500'>
                            Your slot
                        </p>
                        <p className='text-4xl font-bold text-gray-900 dark:text-gray-100'>
                            10 minutes max
                        </p>

                        {/* Decorative example split; the text below carries the meaning */}
                        <div className='flex h-4 w-full overflow-hidden rounded-full' aria-hidden>
                            <div className='w-[70%] bg-accent-yellow' />
                            <div className='w-[30%] bg-accent-yellow/40' />
                        </div>
                        <div className='flex justify-between text-sm font-semibold text-gray-800 dark:text-gray-200'>
                            <span>e.g. 7 min pitch</span>
                            <span>3 min Q&amp;A</span>
                        </div>

                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                            The 10 minutes include Q&amp;A. If your pitch takes the full 10
                            minutes, no extra time is added for questions.
                        </p>
                    </div>
                </div>

                {/* Steps */}
                <ol className='mt-10 grid gap-4 md:grid-cols-3'>
                    {steps.map((step, index) => (
                        <li
                            key={step.title}
                            className='flex items-start gap-4 rounded-2xl bg-white/60 dark:bg-gray-900/40 border border-accent-yellow/20 p-5'
                        >
                            <span className='shrink-0 w-8 h-8 rounded-full bg-accent-yellow text-brand-black flex items-center justify-center font-bold'>
                                {index + 1}
                            </span>
                            <div>
                                <h3 className='font-bold text-gray-900 dark:text-gray-100'>
                                    {step.title}
                                </h3>
                                <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                                    {step.text}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
