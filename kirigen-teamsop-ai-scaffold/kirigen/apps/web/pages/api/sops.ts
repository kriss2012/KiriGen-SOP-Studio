import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import axios from 'axios';
import { authOptions } from '../../lib/auth';

/**
 * Thin server-side proxy — mostly superseded by the next.config.js
 * rewrite to /api/backend/*, but kept as an example of calling the
 * NestJS API directly from a Next.js API route when you need to run
 * extra logic (e.g. response shaping) before it hits the client.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  const headers = { Authorization: `Bearer ${(session as any).accessToken}` };

  if (req.method === 'GET') {
    const { data } = await axios.get(`${apiUrl}/api/sops`, { headers, params: req.query });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { data } = await axios.post(`${apiUrl}/api/sops`, req.body, { headers });
    return res.status(201).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} not allowed`);
}
