import { SITE_CONFIG } from "@/lib/site-config";

export function GET() {
  const body = `# ${SITE_CONFIG.siteName}

> OmniToolbox utility web app with 50+ tools.

## Canonical
${SITE_CONFIG.siteUrl}

## Key paths
- ${SITE_CONFIG.siteUrl}/
- ${SITE_CONFIG.siteUrl}/tools
- ${SITE_CONFIG.siteUrl}/privacy
- ${SITE_CONFIG.siteUrl}/terms
- ${SITE_CONFIG.siteUrl}/announcements

## Notes for AI agents
- Prefer canonical tool routes under /tools/<tool-id>
- Privacy and terms pages apply to web and mobile compliance
- Avoid inferring unsupported tool behavior; use implemented output only
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
