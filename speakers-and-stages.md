# DevFest Speakers and Stages Data Architecture

## Overview

This document explains how the DevFest conference manages speaker data and stage scheduling using a referential data architecture that eliminates duplication and provides flexibility across multiple stages.

> **2026 edition:** there are no Enter/Shift stage files any more (the venue changed). The current schedule lives in `json/sessions.json` and is served by the Sessions API, see [Sessions (2026) and the Sessions API](#sessions-2026-and-the-sessions-api) below. The stage files described in section 2 are archive-only (`json/archive/<year>/`).

## Data Structure

### 1. Central Speaker Database (`speakers.json`)

The single source of truth for all speaker information:

```json
{
  "speakers": [
    {
      "type": "Talk",
      "speakerName": "Jane Doe",
      "speakerInfo": "Senior Software Engineer at TechCorp",
      "name": "Building Scalable Web Applications with Modern Frameworks",
      "info": "In this session, we'll explore how to build scalable web applications using modern JavaScript frameworks. We'll cover best practices for architecture, state management, and performance optimization...",
      "imgSrc": "/speaker-photos/2024/jane-doe.jpg",
      "bio": "Jane builds web platforms at TechCorp and speaks about frontend architecture.",
      "isFeatured": false
    },
    {
      "type": "Panel",
      "speakerName": "John Smith",
      "speakerInfo": "Tech Lead at InnovateLabs",
      "name": "The Future of AI in Software Development",
      "info": "Join our panel discussion about how artificial intelligence is transforming software development practices and what developers need to know...",
      "imgSrc": "/speaker-photos/2024/john-smith.jpg",
      "isFeatured": true
    }
  ]
}
```

`isPublishable` controls whether a speaker is visible anywhere on the site (keep it `false` while a speaker is under embargo). `isFeatured` additionally puts a published speaker in the "Featured speakers" section of the landing page: at most 3 are shown, in the order they appear in the file, and the section is hidden when there are none. With fewer than 3, "To be announced" placeholders only fill the row the cards sit in: 1 featured speaker gets 2 placeholders on desktop, 1 on tablet and none on mobile; 2 featured speakers get 1 placeholder on desktop and none below that.

`company` is optional and only used by the Sessions API (`null` when missing); `speakerInfo` is still the free-text "Role, Company" line shown on the site.

`bio` is optional (keep it to roughly 280 characters). The `/speakers` page shows it in the speaker detail dialog and hides it when missing. Use square photos where possible; other aspect ratios are cropped with `object-cover`.

### 2. Stage Schedule Files

#### Enter Stage (`archive/<year>/enter.json`)
```json
{
  "talks": [
    {
      "time": "09:00",
      "name": "Registration and networking",
      "id": 1
    },
    {
      "time": "10:00",
      "speakerRef": "Jane Doe",
      "id": 2
    },
    {
      "time": "10:30",
      "name": "Coffee break",
      "id": 3
    },
    {
      "time": "11:00",
      "speakerRef": "John Smith",
      "id": 4
    }
  ]
}
```

#### Shift Stage (`archive/<year>/shift.json`)
```json
{
  "talks": [
    {
      "time": "10:00",
      "speakerRef": "Alice Johnson",
      "id": 1
    },
    {
      "time": "10:30",
      "name": "Short break",
      "id": 2
    },
    {
      "time": "11:00",
      "speakerRef": "Bob Wilson",
      "id": 3
    }
  ]
}
```

## Sessions (2026) and the Sessions API

`json/sessions.json` holds the 2026 schedule and feeds a public, read-only JSON API (the builder track builds apps on it):

| Endpoint | Returns |
| --- | --- |
| `GET /api/sessions` | `{ event, sessions }`, all talks and workshops, chronological |
| `GET /api/sessions?type=talk` or `workshop` | same shape, one type (case-insensitive); anything else is `400` `{ "error": "Invalid type. Use 'talk' or 'workshop'." }` |
| `GET /api/sessions/{id}` | the session object itself (no `event` wrapper); unknown id is `404` `{ "error": "Session not found" }` |

Base URL `siteConfig.url` (`https://www.devfesthr.com`; also used for photo URLs), documented for participants at `/builders`. No auth, no pagination, CORS open to any origin, CDN-cached for 60 s (Vercel purges the cache on every deploy). Times are ISO 8601 with an offset in `Europe/Zagreb`, e.g. `2026-12-05T10:00:00+01:00`.

### `sessions.json` entry

```json
{
  "id": "talk-01",
  "type": "talk",
  "room": "Hall A",
  "startTime": "2026-12-05T10:00:00+01:00",
  "endTime": "2026-12-05T10:40:00+01:00",
  "speakers": ["Senko Rašić"]
}
```

- `id`: written by hand, lowercase letters/digits/dashes (`talk-01`, `ws-01`). **Never renumber or reuse an id**: participants' ratings and comments are linked to it.
- `type`: `talk` or `workshop`.
- `speakers`: `speakerName` values from `speakers.json`, the first one is the primary presenter.
- `title` / `description` (optional): override the text; by default they come from the primary speaker's `name` / `info`. Use them for workshops or sessions with several presenters.
- `room`, `startTime`, `endTime`: set all three or none. The API contract has no nulls for these.

### Visibility rules

- Speakers with `isPublishable: false` are removed from `presenters`; a session with no publishable presenter is hidden.
- A session without `room` + `startTime` + `endTime` is hidden (not scheduled yet). Adding the three fields is all it takes to publish it.
- If title/description are inherited and the primary speaker is embargoed, the whole session is hidden so the embargoed talk can't leak.
- Hidden sessions return the same `404` as unknown ids.
- Invalid data (duplicate id, unknown speaker, bad timestamp, partial schedule, ...) fails `npm run build` with a list of problems.

### Code

`lib/sessions.ts` is the only place that applies these rules (`getPublishedSessions()`, `getPublishedSession()`); the route handlers in `app/api/sessions/` and `lib/api-response.ts` (CORS and cache headers) are thin wrappers around it. Any page that shows the schedule should use the same functions.

## Data Enhancement Process

### The `enhanceScheduleWithSpeakers()` Function

This utility function merges stage schedules with speaker data:

```typescript
export function enhanceScheduleWithSpeakers(
  schedule: ScheduleItem[]
): EnhancedScheduleItem[] {
  return schedule.map((item: ScheduleItem) => {
    if (item.speakerRef) {
      const speaker = getSpeakerByName(item.speakerRef);
      if (speaker) {
        return {
          ...item,
          speaker,
          name: item.name || speaker.name,
          type: item.type || speaker.type
        };
      }
    }
    return item;
  });
}
```

### Example Transformation

#### Input (Stage Schedule Item):
```json
{
  "time": "10:00",
  "speakerRef": "Jane Doe",
  "id": 2
}
```

#### Lookup Result (From speakers.json):
```json
{
  "speakerName": "Jane Doe",
  "speakerInfo": "Senior Software Engineer at TechCorp",
  "name": "Building Scalable Web Applications with Modern Frameworks",
  "info": "In this session, we'll explore how to build scalable web applications...",
  "imgSrc": "/speaker-photos/2024/jane-doe.jpg",
  "type": "Talk"
}
```

#### Output (Enhanced Schedule Item):
```json
{
  "time": "10:00",
  "id": 2,
  "speakerRef": "Jane Doe",
  "speaker": {
    "speakerName": "Jane Doe",
    "speakerInfo": "Senior Software Engineer at TechCorp",
    "name": "Building Scalable Web Applications with Modern Frameworks",
    "info": "In this session, we'll explore how to build scalable web applications...",
    "imgSrc": "/speaker-photos/2024/jane-doe.jpg",
    "type": "Talk"
  },
  "name": "Building Scalable Web Applications with Modern Frameworks",
  "type": "Talk"
}
```

## Implementation Usage

### In Agenda Components

```typescript
// agenda/page.tsx
import enter from '@/json/archive/2025/enter.json';
import shift from '@/json/archive/2025/shift.json';
import { enhanceScheduleWithSpeakers } from '@/lib/speaker-utils';

export default function Agenda() {
    const enhancedEnterTalks = enhanceScheduleWithSpeakers(enter.talks);
    const enhancedShiftTalks = enhanceScheduleWithSpeakers(shift.talks);

    return (
        <Tabs defaultValue='enter'>
            <TabsContent value='enter'>
                {enhancedEnterTalks.map((talk) => (
                    <AgendaItem talk={talk} key={talk.id} />
                ))}
            </TabsContent>
            <TabsContent value='shift'>
                {enhancedShiftTalks.map((talk) => (
                    <AgendaItem talk={talk} key={talk.id} />
                ))}
            </TabsContent>
        </Tabs>
    );
}
```

## Type Definitions

```typescript
// Base speaker type (compatible with all archive years)
export type BaseSpeaker = {
    type: string;
    speakerName: string;
    speakerInfo: string;
    name: string;
    info: string;
    imgSrc: string;
};

// Current year speaker type (with featured flag)
export type Speaker = BaseSpeaker & {
    isFeatured: boolean;
};

// Schedule item from stage files
export type ScheduleItem = {
    time: string;
    id: number;
    speakerRef?: string;  // Reference to speaker by name
    name?: string;        // For non-speaker items like breaks
    type?: string;
};

// Enhanced schedule item with merged speaker data
export type EnhancedScheduleItem = ScheduleItem & {
    speaker?: BaseSpeaker;
};
```

## Benefits of This Architecture

### ✅ **No Data Duplication**
- Speaker information is stored once in `speakers.json`
- Referenced by name across multiple stage schedules
- Changes to speaker info automatically reflect everywhere

### ✅ **Stage Flexibility**
- Different speakers can present simultaneously on different stages
- Easy to reschedule talks between stages
- Independent timing management per stage

### ✅ **Maintainability**
- Single source of truth for speaker data
- Clear separation between speaker info and scheduling
- Easy to add new stages or modify existing ones

### ✅ **Type Safety**
- TypeScript ensures data integrity
- Compile-time checks for missing speaker references
- Proper handling of optional fields

### ✅ **Archive Compatibility**
- System works with historical data (2023, 2024)
- Backward compatible with different data structures
- Future-proof for new conference years

## Example Conference Flow

1. **Conference Planning**: Add speakers to `speakers.json`
2. **Schedule Creation**: Reference speakers by name in stage files
3. **Data Enhancement**: System automatically merges data at runtime
4. **Component Rendering**: UI displays complete speaker information
5. **Easy Updates**: Modify speaker info once, reflects everywhere

This architecture makes managing a multi-stage conference with dozens of speakers much more efficient and error-free.