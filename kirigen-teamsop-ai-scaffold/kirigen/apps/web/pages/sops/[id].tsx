import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { apiClient } from '../../lib/api-client';
import Sidebar from '../../components/Sidebar';

export default function SopDetail() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: sop, isLoading } = useQuery({
    queryKey: ['sop', id],
    queryFn: async () => (await apiClient.get(`/sops/${id}`)).data,
    enabled: !!id,
  });

  const approve = useMutation({
    mutationFn: async () => apiClient.post(`/sops/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sop', id] }),
  });

  if (isLoading || !sop) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">Loading…</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">{sop.title}</h1>
          <span className="text-xs uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">
            {sop.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-6">Version {sop.version}</p>

        <article className="prose max-w-none bg-white border rounded-lg p-6">
          <ReactMarkdown>{sop.content ?? ''}</ReactMarkdown>
        </article>

        {sop.status !== 'APPROVED' && (
          <button
            onClick={() => approve.mutate()}
            className="mt-6 bg-brand-500 text-white px-5 py-2.5 rounded-lg font-medium"
          >
            Approve
          </button>
        )}
      </main>
    </div>
  );
}
