import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDrugCandidate } from "@/lib/drugs";
import { StatusBadge } from "@/components/StatusBadge";

interface DetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { id } = await params;
  const drug = await getDrugCandidate(id);
  return { title: drug ? `${drug.name} · Drug Candidate Browser` : "Not found" };
}

export default async function CandidateDetailPage({ params }: DetailProps) {
  const { id } = await params;
  const drug = await getDrugCandidate(id);
  if (!drug) notFound();

  const fields: Array<[string, string]> = [
    ["Indication", drug.indication],
    ["Developer", drug.developer],
    ["Phase", drug.phase],
    ["Mechanism of Action", drug.mechanismOfAction],
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/" className="text-sm font-medium text-indigo-600 hover:underline">
        ← Back to all candidates
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{drug.name}</h1>
        <StatusBadge status={drug.status} />
      </div>
      <p className="mt-3 text-lg text-slate-600">{drug.description}</p>

      <dl className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {fields.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-3">
            <dt className="text-sm font-medium text-slate-500">{label}</dt>
            <dd className="text-sm text-slate-900 sm:col-span-2">{value}</dd>
          </div>
        ))}
        <div className="grid gap-1 px-5 py-4 sm:grid-cols-3">
          <dt className="text-sm font-medium text-slate-500">Side effects</dt>
          <dd className="sm:col-span-2">
            <ul className="flex flex-wrap gap-2">
              {drug.sideEffects.map((se) => (
                <li
                  key={se}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {se}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </article>
  );
}
