import speakersData from '@/json/speakers.json';
import sessionsData from '@/json/sessions.json';
import { siteConfig } from '@/config/site';

/**
 * Conference Sessions API data layer.
 *
 * Single place that turns json/sessions.json + json/speakers.json into the public shape
 * served by /api/sessions. Everything public goes through `getPublishedSessions()` /
 * `getPublishedSession()`, so the embargo rules live here and nowhere else.
 *
 * Visibility rules:
 *  - Presenters with `isPublishable: false` are dropped. A session with no publishable presenter is hidden.
 *  - A session without a complete schedule (room + startTime + endTime) is hidden, because the API
 *    contract defines all three as non-null strings.
 *  - Title/description default to the first listed speaker's talk. If that speaker is embargoed and
 *    the session doesn't set both itself, the session is hidden so the embargoed talk can't leak.
 *
 * Invalid data throws when this module is first imported, so a bad sessions.json fails the build.
 */

export const SESSION_TYPES = ['talk', 'workshop'] as const;
export type SessionType = (typeof SESSION_TYPES)[number];

// Photos are served from /public, so the API needs absolute URLs. Same base URL as the /builders docs.
const PUBLIC_BASE_URL = siteConfig.url;

type SpeakerRecord = {
    speakerName: string;
    company?: string;
    name: string;
    info: string;
    imgSrc?: string;
    isPublishable: boolean;
};

type SessionRecord = {
    id: string;
    type: string;
    title?: string;
    description?: string;
    room?: string;
    startTime?: string;
    endTime?: string;
    speakers: string[];
};

export type Presenter = {
    name: string;
    company: string | null;
    photoUrl: string | null;
};

export type Session = {
    id: string;
    type: SessionType;
    title: string;
    description: string;
    room: string;
    startTime: string;
    endTime: string;
    presenters: Presenter[];
};

export type EventInfo = {
    name: string;
    date: string;
    timezone: string;
};

const speakerRecords = speakersData.speakers as SpeakerRecord[];
const sessionRecords = sessionsData.sessions as SessionRecord[];

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// ISO 8601 with an explicit offset, e.g. 2026-12-05T10:00:00+01:00
const OFFSET_TIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;

function validate() {
    const problems: string[] = [];
    const speakerNames = new Set<string>();
    const ids = new Set<string>();

    for (const speaker of speakerRecords) {
        if (speakerNames.has(speaker.speakerName)) {
            problems.push(`speakers.json: duplicate speakerName "${speaker.speakerName}"`);
        }
        speakerNames.add(speaker.speakerName);
    }

    for (const session of sessionRecords) {
        const where = `sessions.json "${session.id}"`;

        if (!ID_PATTERN.test(session.id)) {
            problems.push(`${where}: id must be lowercase letters, digits and dashes (e.g. talk-01)`);
        }
        if (ids.has(session.id)) problems.push(`${where}: duplicate id`);
        ids.add(session.id);

        if (!(SESSION_TYPES as readonly string[]).includes(session.type)) {
            problems.push(`${where}: type must be one of ${SESSION_TYPES.join(', ')}`);
        }
        if (!Array.isArray(session.speakers) || session.speakers.length === 0) {
            problems.push(`${where}: speakers must list at least one speaker`);
        }
        for (const name of session.speakers ?? []) {
            if (!speakerNames.has(name)) problems.push(`${where}: unknown speaker "${name}"`);
        }

        // Schedule is all or nothing: a session is either fully scheduled or not scheduled yet.
        const scheduleFields = [session.room, session.startTime, session.endTime];
        const given = scheduleFields.filter((value) => value !== undefined).length;
        if (given !== 0 && given !== 3) {
            problems.push(`${where}: room, startTime and endTime must all be set, or all omitted`);
        } else if (given === 3) {
            if (!session.room?.trim()) problems.push(`${where}: room must not be empty`);
            for (const [field, value] of [
                ['startTime', session.startTime],
                ['endTime', session.endTime],
            ] as const) {
                if (!value || !OFFSET_TIME_PATTERN.test(value) || Number.isNaN(Date.parse(value))) {
                    problems.push(`${where}: ${field} must be ISO 8601 with an offset, e.g. 2026-12-05T10:00:00+01:00`);
                }
            }
            if (Date.parse(session.endTime!) <= Date.parse(session.startTime!)) {
                problems.push(`${where}: endTime must be after startTime`);
            }
        }
    }

    if (problems.length > 0) {
        throw new Error(`Invalid session data:\n - ${problems.join('\n - ')}`);
    }
}

validate();

const speakersByName = new Map(speakerRecords.map((speaker) => [speaker.speakerName, speaker]));

function toPresenter(speaker: SpeakerRecord): Presenter {
    return {
        name: speaker.speakerName,
        company: speaker.company?.trim() || null,
        photoUrl: speaker.imgSrc ? new URL(speaker.imgSrc, PUBLIC_BASE_URL).href : null,
    };
}

function toPublicSession(record: SessionRecord): Session | null {
    const { room, startTime, endTime } = record;
    if (!room || !startTime || !endTime) return null;

    const speakers = record.speakers.map((name) => speakersByName.get(name)!);
    const publishable = speakers.filter((speaker) => speaker.isPublishable);
    if (publishable.length === 0) return null;

    const primary = speakers[0];
    const needsPrimary = record.title === undefined || record.description === undefined;
    if (needsPrimary && !primary.isPublishable) return null;

    return {
        id: record.id,
        type: record.type as SessionType,
        title: record.title ?? primary.name,
        description: record.description ?? primary.info,
        room,
        startTime,
        endTime,
        presenters: publishable.map(toPresenter),
    };
}

const byStartThenId = (a: Session, b: Session) =>
    Date.parse(a.startTime) - Date.parse(b.startTime) || a.id.localeCompare(b.id);

export function getEvent(): EventInfo {
    return sessionsData.event;
}

/** Publicly visible sessions in chronological order, optionally limited to one type. */
export function getPublishedSessions(type?: SessionType): Session[] {
    return sessionRecords
        .map(toPublicSession)
        .filter((session): session is Session => session !== null && (!type || session.type === type))
        .sort(byStartThenId);
}

/** A single publicly visible session. Unknown, embargoed and unscheduled ids all return undefined. */
export function getPublishedSession(id: string): Session | undefined {
    const record = sessionRecords.find((session) => session.id === id);
    return record ? (toPublicSession(record) ?? undefined) : undefined;
}

export function isSessionType(value: string): value is SessionType {
    return (SESSION_TYPES as readonly string[]).includes(value);
}
