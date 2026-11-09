import { NextResponse } from 'next/server';

// Public, read-only, unauthenticated API: any origin may read it (builder-track apps run in the browser).
const API_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    // The data only changes on deploy (Vercel purges the CDN cache then), so a short CDN cache is safe
    // and keeps most requests from invoking the function at all.
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

export function apiJson(body: unknown, status = 200) {
    return NextResponse.json(body, { status, headers: API_HEADERS });
}

export function apiError(message: string, status: number) {
    return apiJson({ error: message }, status);
}

export function apiPreflight() {
    return new NextResponse(null, {
        status: 204,
        headers: { ...API_HEADERS, 'Access-Control-Max-Age': '86400' },
    });
}
