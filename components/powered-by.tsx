'use client';

import Image from 'next/image';

export default function PoweredBy() {
    return (
        <section className='py-16'>
            <div className='w-full max-w-[1020px] mx-auto text-center space-y-6'>
                <h2 className='text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-500'>
                    Powered by
                </h2>
                <div className='flex items-center justify-center'>
                    <div className='bg-white dark:bg-gray-200 rounded-2xl p-6 border border-gray-200 dark:border-gray-100 w-full max-w-md'>
                        <div className='relative w-full h-16'>
                            <Image
                                src='/powered-by/Google_2015_logo.svg'
                                alt='Google logo'
                                fill
                                className='object-contain'
                                sizes='448px'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
