import type { Metadata } from 'next';

import { CodeBlock } from '@/components/builders/code-block';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: 'Builders | DevFest Croatia 2026',
    description:
        'Documentation for the DevFest Croatia 2026 Sessions API: all talks and workshops as JSON, for the builder track.',
};

const BASE_URL = siteConfig.url;

// Sample data for the docs only, not the real programme.
const talk = `{
  "id": "talk-01",
  "type": "talk",
  "title": "Gemini in production: what nobody told us",
  "description": "Lessons from our first year running Gemini in production.",
  "room": "Hall A",
  "startTime": "2026-12-05T10:00:00+01:00",
  "endTime": "2026-12-05T10:40:00+01:00",
  "presenters": [
    {
      "name": "Ana Anić",
      "company": "Firma d.o.o.",
      "photoUrl": "${BASE_URL}/speaker-photos/2026/ana-anic.jpg"
    }
  ]
}`;

const workshop = `{
  "id": "ws-01",
  "type": "workshop",
  "title": "From zero to Cloud Run",
  "description": "Hands-on workshop: deploy a Node app to Cloud Run.",
  "room": "Hall B",
  "startTime": "2026-12-05T10:00:00+01:00",
  "endTime": "2026-12-05T12:00:00+01:00",
  "presenters": [
    { "name": "Ivana Horvat", "company": "Cloud Studio", "photoUrl": null },
    { "name": "Petar Kovač", "company": "Cloud Studio", "photoUrl": null }
  ]
}`;

const indent = (json: string) =>
    json
        .split('\n')
        .map((line) => `    ${line}`)
        .join('\n');

const event = `  "event": {
    "name": "GDG DevFest Zagreb 2026",
    "date": "2026-12-05",
    "timezone": "Europe/Zagreb"
  },`;

const listResponse = `{
${event}
  "sessions": [
${indent(talk)},
${indent(workshop)}
  ]
}`;

const talksResponse = `{
${event}
  "sessions": [
${indent(talk)}
  ]
}`;

const quickFacts: Array<[string, string]> = [
    ['Base URL', BASE_URL],
    ['Format', 'JSON'],
    ['Authentication', 'None'],
    ['Pagination', 'None, all sessions come back in one response'],
    ['CORS', 'Open to any origin, so you can call it straight from the browser'],
    ['Caching', 'Responses may be cached for up to 60 seconds'],
];

const fields: Array<[string, string, string]> = [
    ['id', 'string', 'Stable unique identifier. Use it to link ratings and comments. It never changes.'],
    ['type', 'string', 'talk or workshop'],
    ['title', 'string', 'Session title'],
    ['description', 'string', 'Session description'],
    ['room', 'string', 'Room name'],
    ['startTime', 'string', 'Start time, ISO 8601 with offset'],
    ['endTime', 'string', 'End time, ISO 8601 with offset'],
    ['presenters', 'array', 'Always a list, even with a single presenter'],
    ['presenters[].name', 'string', "Presenter's full name"],
    ['presenters[].company', 'string | null', 'Company, or null'],
    ['presenters[].photoUrl', 'string | null', 'Photo URL, or null if no photo is available'],
];

const inlineCode = 'rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]';

const Builders = () => (
    <section className='container mx-auto px-4 py-16'>
        <div className='mx-auto mb-12 max-w-3xl text-center'>
            <span className='inline-flex items-center rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-blue'>
                Builders
            </span>
            <h1 className='mt-4 text-4xl font-bold md:text-5xl'>
                Build on the DevFest API
            </h1>
            <p className='mt-4 text-muted-foreground'>
                Every talk and workshop at DevFest Croatia 2026 as JSON: titles,
                descriptions, rooms, times and presenters. Use it to build your
                builder-track app and let attendees rate the sessions.
            </p>
        </div>

        <div className='mx-auto max-w-3xl space-y-14'>
            <div>
                <h2 className='text-2xl font-bold'>Quick facts</h2>
                <dl className='mt-4 divide-y rounded-xl border'>
                    {quickFacts.map(([term, value]) => (
                        <div
                            key={term}
                            className='grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4'
                        >
                            <dt className='text-sm font-semibold'>{term}</dt>
                            <dd className='break-words text-sm text-muted-foreground'>
                                {term === 'Base URL' ? (
                                    <code className={inlineCode}>{value}</code>
                                ) : (
                                    value
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className='space-y-4'>
                <h2 className='text-2xl font-bold'>Endpoints</h2>
                <p className='text-muted-foreground'>
                    Three read-only <code className={inlineCode}>GET</code> requests.
                    The examples below use curl. The responses use sample data, not
                    the real programme.
                </p>
            </div>

            <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>All sessions</h3>
                <p className='text-muted-foreground'>
                    Returns every talk and workshop in chronological order, wrapped
                    in an <code className={inlineCode}>event</code> object.
                </p>
                <CodeBlock label='Request' code={`curl -s ${BASE_URL}/api/sessions`} />
                <CodeBlock label='Response · 200 OK' code={listResponse} />
            </div>

            <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>Filter by type</h3>
                <p className='text-muted-foreground'>
                    Add <code className={inlineCode}>?type=talk</code> or{' '}
                    <code className={inlineCode}>?type=workshop</code>. The response
                    has the same shape as the full list.
                </p>
                <CodeBlock label='Talks only' code={`curl -s "${BASE_URL}/api/sessions?type=talk"`} />
                <CodeBlock label='Workshops only' code={`curl -s "${BASE_URL}/api/sessions?type=workshop"`} />
                <CodeBlock label='Response · 200 OK (talks)' code={talksResponse} />
            </div>

            <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>A single session</h3>
                <p className='text-muted-foreground'>
                    Returns the session object itself, without the{' '}
                    <code className={inlineCode}>event</code> wrapper.
                </p>
                <CodeBlock label='Request' code={`curl -s ${BASE_URL}/api/sessions/talk-01`} />
                <CodeBlock label='Response · 200 OK' code={talk} />
            </div>

            <div className='space-y-4'>
                <h2 className='text-2xl font-bold'>Errors</h2>
                <p className='text-muted-foreground'>
                    Errors are JSON with a single{' '}
                    <code className={inlineCode}>error</code> message.
                </p>
                <CodeBlock
                    label='404 Not Found · unknown session id'
                    code={`curl -s ${BASE_URL}/api/sessions/talk-99

{
  "error": "Session not found"
}`}
                />
                <CodeBlock
                    label='400 Bad Request · invalid type'
                    code={`curl -s "${BASE_URL}/api/sessions?type=keynote"

{
  "error": "Invalid type. Use 'talk' or 'workshop'."
}`}
                />
            </div>

            <div className='space-y-4'>
                <h2 className='text-2xl font-bold'>Fields</h2>
                <div className='overflow-x-auto rounded-xl border'>
                    <table className='w-full min-w-[32rem] text-left text-sm'>
                        <thead className='border-b bg-muted/60 text-xs uppercase tracking-widest text-muted-foreground'>
                            <tr>
                                <th className='px-4 py-2 font-semibold'>Field</th>
                                <th className='px-4 py-2 font-semibold'>Type</th>
                                <th className='px-4 py-2 font-semibold'>Description</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y'>
                            {fields.map(([field, type, description]) => (
                                <tr key={field}>
                                    <td className='px-4 py-2 align-top'>
                                        <code className={inlineCode}>{field}</code>
                                    </td>
                                    <td className='px-4 py-2 align-top text-muted-foreground'>
                                        {type}
                                    </td>
                                    <td className='px-4 py-2 align-top text-muted-foreground'>
                                        {description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='space-y-4'>
                <h2 className='text-2xl font-bold'>Times</h2>
                <p className='text-muted-foreground'>
                    All times are ISO 8601 with a timezone offset, in conference
                    local time (<code className={inlineCode}>Europe/Zagreb</code>):
                </p>
                <CodeBlock label='Example' code='2026-12-05T10:00:00+01:00' />
                <p className='rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm'>
                    Always parse the offset. Do not treat times as UTC.
                </p>
            </div>

            <div className='space-y-4'>
                <h2 className='text-2xl font-bold'>Good to know</h2>
                <ul className='list-disc space-y-2 pl-5 text-muted-foreground'>
                    <li>
                        Sessions are added to the API as they are confirmed, so the list
                        can be shorter than the final programme. Fetch it again instead
                        of hardcoding it.
                    </li>
                    <li>
                        Key your ratings and comments on{' '}
                        <code className={inlineCode}>id</code>. Ids are stable and are
                        never reused.
                    </li>
                    <li>
                        <code className={inlineCode}>company</code> and{' '}
                        <code className={inlineCode}>photoUrl</code> can be{' '}
                        <code className={inlineCode}>null</code>. Handle both.
                    </li>
                    <li>
                        The API is read-only. Store ratings and comments in your own
                        backend.
                    </li>
                </ul>
            </div>
        </div>
    </section>
);

export default Builders;
