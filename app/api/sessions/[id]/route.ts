import type { NextRequest } from 'next/server';

import { apiError, apiJson, apiPreflight } from '@/lib/api-response';
import { getPublishedSession } from '@/lib/sessions';

// GET /api/sessions/{id} -> the session object itself, without the event wrapper.
// Unknown, embargoed and not-yet-scheduled ids all return the same 404.
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = getPublishedSession(id);

    if (!session) {
        return apiError('Session not found', 404);
    }

    return apiJson(session);
}

export function OPTIONS() {
    return apiPreflight();
}
