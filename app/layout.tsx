import './globals.css';
import 'yet-another-react-lightbox/styles.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ['devfest', 'gdg', 'zagreb'],
    authors: [
        {
            name: 'Boris Martinovic',
            url: 'https://martinovic.dev',
        },
        {
            name: 'Antonio Hadrovic',
            url: 'https://ah-studio.net',
        },
    ],
    creator: 'martinovicdev',
    icons: {
        icon: '/GDG-logo.png',
    },
};

export const viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={cn(
                    'flex flex-col min-h-screen dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950',
                    inter.className
                )}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                >
                    <SiteHeader />
                    <div className='flex-1 bg-image-light dark:bg-image-dark'>
                        {children}
                    </div>
                    <SiteFooter />
                </ThemeProvider>
            </body>
        </html>
    );
}
