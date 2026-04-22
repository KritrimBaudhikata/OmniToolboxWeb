import { notFound } from "next/navigation";
import { ToolPageContent } from "@/components/tool-page-content";
import { getToolById, TOOL_IDS } from "@/lib/tools";
import { SITE_CONFIG } from "@/lib/site-config";

export function generateStaticParams() {
  return TOOL_IDS.map((toolId) => ({ toolId }));
}

export async function generateMetadata({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) return {};
  return {
    title: tool.name,
    description: `${tool.name} in SuperAppWeb.`,
    alternates: {
      canonical: `/tools/${toolId}`,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_CONFIG.siteUrl}/` },
              { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_CONFIG.siteUrl}/tools` },
              { "@type": "ListItem", position: 3, name: tool.name, item: `${SITE_CONFIG.siteUrl}/tools/${toolId}` },
            ],
          }),
        }}
      />
      <ToolPageContent tool={tool} />
    </>
  );
}
