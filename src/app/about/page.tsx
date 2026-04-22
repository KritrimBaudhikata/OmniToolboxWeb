import { APP_CONFIG } from "@/lib/legal";

export const metadata = {
  title: "About OmniToolbox",
  description: "About OmniToolbox product and ecosystem.",
};

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">About OmniToolbox</h1>
        <p className="mt-2 text-sm text-slate-600">
          {APP_CONFIG.appName} is an all-in-one utility toolbox for daily, developer, and productivity workflows.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">What we provide</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>50+ utility tools in one place</li>
          <li>Web-first quick access plus mobile app ecosystem</li>
          <li>Privacy and legal docs published for store compliance</li>
          <li>Future browser extension updates via announcements</li>
        </ul>
      </div>
    </section>
  );
}
