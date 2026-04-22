import { TERMS_LAST_UPDATED, TERMS_SECTIONS, TERMS_TITLE } from "@/lib/legal";

export const metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{TERMS_TITLE}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Last updated: {TERMS_LAST_UPDATED}</p>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
          This page serves as the public website host for OmniToolbox terms and conditions required by mobile store compliance.
        </p>
      </div>
      {TERMS_SECTIONS.map((section) => (
        <article key={section.title} className="space-y-2 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-medium text-slate-900 dark:text-slate-100">{section.title}</h2>
          <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-200">{section.body}</p>
        </article>
      ))}
    </section>
  );
}
