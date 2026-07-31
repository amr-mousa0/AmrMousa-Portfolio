/**
 * Server-side PDF Stream Proxy with Anti-IDM Header Protection
 * Streams PDF binary as application/octet-stream so IDM (Internet Download Manager) does not intercept it.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing target URL' }), { status: 400 });
  }

  try {
    let cleanUrl = targetUrl.includes('%') ? targetUrl : encodeURI(targetUrl);
    let res = await fetch(cleanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/pdf,application/octet-stream,*/*'
      }
    });

    // Auto-resolve 404s on GitHub raw URLs by inspecting repo contents for PDF files
    if (!res.ok && res.status === 404 && cleanUrl.includes('raw.githubusercontent.com')) {
      try {
        const match = cleanUrl.match(/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(.+)/);
        if (match) {
          const [, owner, repo] = match;
          const apiRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
          });
          if (apiRes.ok) {
            const files = await apiRes.json();
            const pdfFile = Array.isArray(files) && files.find((f: any) => f.name.toLowerCase().endsWith('.pdf'));
            if (pdfFile && pdfFile.download_url) {
              console.log(`[PDF Proxy] Auto-resolved 404 filename to exact GitHub file: ${pdfFile.name}`);
              res = await fetch(pdfFile.download_url, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                  'Accept': 'application/pdf,application/octet-stream,*/*'
                }
              });
            }
          }
        }
      } catch (err) {
        console.warn('[PDF Proxy] GitHub auto-resolve error:', err);
      }
    }

    if (!res.ok) {
      return new Response(`PDF fetch failed with status ${res.status}`, { status: res.status });
    }

    const arrayBuffer = await res.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400'
      }
    });
  } catch (e: any) {
    return new Response(`PDF Proxy Error: ${e.message}`, { status: 500 });
  }
};
