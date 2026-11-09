import type { NextRequest } from 'next/server';

import { apiError, apiJson, apiPreflight } from '@/lib/api-response';
import { getEvent, getPublishedSessions, isSessionType } from '@/lib/sessions';

// GET /api/sessions            -> all talks and workshops
// GET /api/sessions?type=talk  -> talks only (also: workshop)
export function GET(request: NextRequest) {
    const type = request.nextUrl.searchParams.get('type');

    if (type === null) {
        return apiJson({ event: getEvent(), sessions: getPublishedSessions() });
    }

    const normalized = type.toLowerCase();
    if (!isSessionType(normalized)) {
        return apiError("Invalid type. Use 'talk' or 'workshop'.", 400);
    }

    return apiJson({ event: getEvent(), sessions: getPublishedSessions(normalized) });
}

export function OPTIONS() {
    return apiPreflight();
}
