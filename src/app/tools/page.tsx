import { ToolsCatalog } from "@/components/tools-catalog";

export const metadata = {
  title: "All Tools",
  description: "Browse all available SuperAppWeb tools by category.",
};

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <ToolsCatalog initialQuery={q ?? ""} />;
}
