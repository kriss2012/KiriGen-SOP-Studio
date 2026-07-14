import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';

type Team = { id: string; name: string };

/**
 * Simple team list — the same shape as the KiriGen spec's original
 * example, wired up to the real API client and react-query instead of
 * a bare useEffect/axios call.
 */
export default function TeamList() {
  const { data: teams, isLoading } = useQuery<Team[]>({
    queryKey: ['teams'],
    queryFn: async () => (await apiClient.get('/teams')).data,
  });

  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-lg font-bold mb-3">My Teams</h2>
      {isLoading && <p className="text-sm text-gray-500">Loading…</p>}
      <ul className="space-y-2">
        {teams?.map((team) => (
          <li key={team.id} className="p-2 border rounded hover:bg-gray-50 text-sm">
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
