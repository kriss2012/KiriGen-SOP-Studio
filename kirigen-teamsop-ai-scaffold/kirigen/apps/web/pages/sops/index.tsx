import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';
import Sidebar from '../../components/Sidebar';
import SopCard from '../../components/SopCard';

export default function SopsIndex() {
  const { data: sops, isLoading } = useQuery({
    queryKey: ['sops'],
    queryFn: async () => (await apiClient.get('/sops')).data,
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">All SOPs</h1>
          <Link href="/sops/new" className="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + New SOP
          </Link>
        </div>
        {isLoading && <p className="text-gray-500">Loading…</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sops?.map((sop: any) => (
            <SopCard key={sop.id} sop={sop} />
          ))}
        </div>
      </main>
    </div>
  );
}
