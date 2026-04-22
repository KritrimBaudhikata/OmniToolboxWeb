import { WEB_FALLBACKS } from "@/lib/capabilities";

export const metadata = {
  title: "Announcements",
  description: "Roadmap and release updates for web, mobile, and extensions.",
};

export default function AnnouncementsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Announcements and Roadmap</h1>
      <article className="rounded border border-slate-200 bg-white p-4">
        <h2 className="font-medium">Web release active</h2>
        <p className="text-sm text-slate-700">SuperAppWeb is now the primary public base with SEO-focused tool pages.</p>
      </article>
      <article className="rounded border border-slate-200 bg-white p-4">
        <h2 className="font-medium">Mobile app updates</h2>
        <p className="text-sm text-slate-700">Store listing and compliance updates will be posted here once Apple/Google release statuses change.</p>
      </article>
      <article className="rounded border border-slate-200 bg-white p-4">
        <h2 className="font-medium">Browser extension</h2>
        <p className="text-sm text-slate-700">Web extension launch details will be added in this section.</p>
      </article>
      <article className="rounded border border-slate-200 bg-white p-4">
        <h2 className="font-medium">Web fallback notes</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>{WEB_FALLBACKS.iap}</li>
          <li>{WEB_FALLBACKS.ads}</li>
          <li>{WEB_FALLBACKS.camera}</li>
          <li>{WEB_FALLBACKS.notifications}</li>
        </ul>
      </article>
    </section>
  );
}
