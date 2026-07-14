import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '../../lib/api-client';
import Sidebar from '../../components/Sidebar';

const DOC_TYPES = [
  { value: 'sop', label: 'SOP' },
  { value: 'onboarding', label: 'Onboarding Doc' },
  { value: 'checklist', label: 'Checklist' },
  { value: 'qa', label: 'QA System' },
];

export default function NewSop() {
  const router = useRouter();
  const [rawText, setRawText] = useState('');
  const [docType, setDocType] = useState('sop');
  const [teamId, setTeamId] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const { data } = await apiClient.post('/sops/generate', { rawText, docType, teamId });
      router.push(`/sops/${data.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Generate a new document</h1>

        <label className="block text-sm font-medium mb-1">Document type</label>
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        >
          {DOC_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium mb-1">Team ID</label>
        <input
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
          placeholder="Paste a team id from /teams"
        />

        <label className="block text-sm font-medium mb-1">Raw transcript / notes</label>
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          rows={10}
          className="w-full border rounded-lg px-3 py-2 mb-4 font-mono text-sm"
          placeholder="Paste a Loom transcript, Slack thread, or rough notes…"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !rawText || !teamId}
          className="bg-brand-500 disabled:opacity-40 text-white px-5 py-2.5 rounded-lg font-medium"
        >
          {loading ? 'Generating…' : 'Generate document'}
        </button>
      </main>
    </div>
  );
}
