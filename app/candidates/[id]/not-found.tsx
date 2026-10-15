import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-2xl font-bold">Candidate not found</h1>
      <p className="mt-2 text-slate-600">This drug candidate doesn't exist or was removed.</p>
      <Link href="/" className="mt-4 inline-block text-indigo-600 hover:underline">
        ← Back to all candidates
      </Link>
    </div>
  );
}
