'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

// Read-only code/command block with a copy button. `label` is the small caption above the code.
export function CodeBlock({ code, label }: { code: string; label: string }) {
    const [copied, setCopied] = useState(false);

    async function copy() {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // Clipboard can be blocked (insecure origin, permissions). The text stays selectable.
        }
    }

    return (
        <figure className='overflow-hidden rounded-xl border bg-muted/40'>
            <figcaption className='flex items-center justify-between border-b bg-muted/60 py-1 pl-4 pr-1'>
                <span className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                    {label}
                </span>
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='h-8 gap-1.5 text-xs'
                    onClick={copy}
                >
                    {copied ? <Check className='h-3.5 w-3.5' /> : <Copy className='h-3.5 w-3.5' />}
                    <span aria-live='polite'>{copied ? 'Copied' : 'Copy'}</span>
                </Button>
            </figcaption>
            <pre className='overflow-x-auto p-4 text-sm leading-relaxed'>
                <code className='font-mono'>{code}</code>
            </pre>
        </figure>
    );
}
