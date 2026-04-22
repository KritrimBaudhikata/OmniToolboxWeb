import Link from "next/link";
import { APP_CONFIG } from "@/lib/legal";

export const metadata = {
  title: "Support OmniToolbox",
  description: "Donation/support options for OmniToolbox.",
};

export default function SupportPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Support OmniToolbox</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          If OmniToolbox helps you daily, you can support development via the options below.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Quick support</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={APP_CONFIG.paypalUrl}
            target="_blank"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            PayPal Support
          </Link>
          <Link
            href={APP_CONFIG.feedbackUrl}
            target="_blank"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200"
          >
            Send Feedback
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Support tiers</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {APP_CONFIG.supportTiers.map((tier) => (
            <article key={tier.label} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800/40">
              <p className="font-semibold text-slate-900 dark:text-slate-100">{tier.label}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">${tier.amount}</p>
              <Link
                href={tier.url || APP_CONFIG.paypalUrl}
                target="_blank"
                className="mt-3 inline-block rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
              >
                Support now
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
