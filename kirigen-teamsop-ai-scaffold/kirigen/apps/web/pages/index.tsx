import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-brand-600">KiriGen TeamSOP AI</h1>
      <p className="mt-4 text-lg text-gray-600">
        Turn Loom transcripts and messy notes into SOPs, onboarding docs, checklists, and QA
        systems your whole team can rely on.
      </p>
      <div className="mt-8">
        {session ? (
          <Link href="/dashboard" className="px-6 py-3 bg-brand-500 text-white rounded-lg font-medium">
            Go to dashboard
          </Link>
        ) : (
          <Link href="/login" className="px-6 py-3 bg-brand-500 text-white rounded-lg font-medium">
            Sign in
          </Link>
        )}
      </div>
    </main>
  );
}
