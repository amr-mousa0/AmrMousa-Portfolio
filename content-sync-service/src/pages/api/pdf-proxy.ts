/**
 * Server-side PDF CORS & Connection Proxy
 * Fetches PDF binary server-side and streams it to client with full CORS access.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing target URL' }), { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/pdf,application/octet-stream,*/*'
      }
    });

    if (!res.ok) {
      return new Response(`PDF fetch failed with status ${res.status}`, { status: res.status });
    }

    const arrayBuffer = await res.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400'
      }
    });
  } catch (e: any) {
    return new Response(`PDF Proxy Error: ${e.message}`, { status: 500 });
  }
};
