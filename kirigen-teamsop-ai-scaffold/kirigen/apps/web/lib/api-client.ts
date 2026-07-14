import axios from 'axios';
import { getSession } from 'next-auth/react';

/**
 * Axios instance pointed at the NestJS API (proxied through
 * /api/backend/* in next.config.js so the browser only ever talks to
 * the Next.js origin — avoids CORS and hides the API's real URL).
 */
export const apiClient = axios.create({
  baseURL: '/api/backend',
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
