# DevFest Speakers and Stages Data Architecture

## Overview

This document explains how the DevFest conference manages speaker data and stage scheduling using a referential data architecture that eliminates duplication and provides flexibility across multiple stages.

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