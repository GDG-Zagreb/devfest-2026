import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function PitchYourProject() {
    return (
        <div className='w-full mt-8'>
            <div className='bg-linear-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl p-8 shadow-xl border border-yellow-200 dark:border-yellow-700'>
                <div className='text-center space-y-6'>
                    <div className='flex items-center justify-center gap-3 mb-4'>
                        <div className='p-3 bg-yellow-100 dark:bg-yellow-800/50 rounded-full shadow-lg'>
                            <Lightbulb className='w-8 h-8' />
                        </div>
                        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200'>
                            Pitch Your Project!
                        </h2>
                    </div>

                    <div className='max-w-3xl mx-auto space-y-6'>
                        <p className='text-lg text-gray-700 dark:text-gray-300'>
                            Got an amazing project or startup idea? Present it to the DevFest community!
                        </p>

                        {/* Step by Step Process */}
                        <div className='space-y-4'>
                            {/* Step 1 */}
                            <div className='flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-yellow-200 dark:border-yellow-600'>
                                <div className='shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg'>
                                    1
                                </div>
                                <div className='text-left'>
                                    <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                                        Have a cool side project, idea, or startup?
                                    </h4>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                                        Whether you&rsquo;re working on a side project, have an idea you haven&rsquo;t started yet, or are running a startup - we want to hear from you!
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className='flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-yellow-200 dark:border-yellow-600'>
                                <div className='shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg'>
                                    2
                                </div>
                                <div className='text-left'>
                                    <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                                        Apply to pitch form
                                    </h4>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                                        Fill out our application form with details about your project. Applications close September 30, 2025.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className='flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-yellow-200 dark:border-yellow-600'>
                                <div className='shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg'>
                                    3
                                </div>
                                <div className='text-left'>
                                    <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                                        Present in flexible 10-minute format
                                    </h4>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                                        You have 10 minutes total. Use it however you want: 5min presenting + 5min Q&A, 7min + 3min, or any combination that works for you!
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className='flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-yellow-200 dark:border-yellow-600'>
                                <div className='shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg'>
                                    4
                                </div>
                                <div className='text-left'>
                                    <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                                        Get feedback, inspire others, find collaborators, get users
                                    </h4>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                                        Receive valuable feedback, inspire the community, and potentially find collaborators or investors for your project!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Available Slots & Apply Button */}
                        <div className='bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg border border-yellow-200 dark:border-yellow-600'>
                            <div className='space-y-4'>
                                <div className='flex items-center justify-center gap-3'>
                                    <span className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
                                        11 Pitch Slots Available
                                    </span>
                                </div>

                                <div className='pt-4 border-t border-yellow-200 dark:border-yellow-600'>
                                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                                        <strong>Applications close October 12, 2025</strong> • Selected pitchers notified by October 15, 2025
                                    </p>

                                    <Link
                                        href='https://docs.google.com/forms/d/e/1FAIpQLSeUlJI3paMOEgSJXL1gFvVRUYFQIdN0stdrgXtNKVRzgG3Elg/viewform'
                                        target='_blank'
                                        className='block'
                                    >
                                        <Button className='w-full max-w-md h-14 rounded-2xl text-lg font-semibold bg-linear-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-xl transform transition-all duration-300 hover:scale-105'>
                                            <svg className='mr-3 w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                            </svg>
                                            Apply for Pitch Slot
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
