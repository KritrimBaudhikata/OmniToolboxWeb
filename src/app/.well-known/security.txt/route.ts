import { SITE_CONFIG } from "@/lib/site-config";
import { APP_CONFIG } from "@/lib/legal";

export function GET() {
  const contact = String(APP_CONFIG.developerEmailOrUrl).includes("@")
    ? `mailto:${APP_CONFIG.developerEmailOrUrl}`
    : APP_CONFIG.developerEmailOrUrl;

  const body = `Contact: ${contact}
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: ${SITE_CONFIG.siteUrl}/.well-known/security.txt
Policy: ${SITE_CONFIG.siteUrl}/privacy
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
