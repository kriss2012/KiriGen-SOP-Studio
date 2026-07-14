import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import Sidebar from '../components/Sidebar';
import SopCard from '../components/SopCard';
import TeamList from '../components/TeamList';

interface Sop {
  id: string;
  title: string;
  status: string;
  updatedAt: string;
}

export default function Dashboard() {
  const { data: sops, isLoading } = useQuery<Sop[]>({
    queryKey: ['sops'],
    queryFn: async () => (await apiClient.get('/sops')).data,
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-4">Your SOPs</h1>
            {isLoading && <p className="text-gray-500">Loading…</p>}
            <div className="grid sm:grid-cols-2 gap-4">
              {sops?.map((sop) => (
                <SopCard key={sop.id} sop={sop} />
              ))}
            </div>
          </section>
          <aside>
            <TeamList />
          </aside>
        </div>
      </main>
    </div>
  );
}
