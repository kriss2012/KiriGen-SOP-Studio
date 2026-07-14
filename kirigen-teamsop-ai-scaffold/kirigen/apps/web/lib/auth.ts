import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

/**
 * NextAuth config: credentials provider delegates to the NestJS
 * /auth/login endpoint; Google OAuth is wired for one-click sign-in.
 * Add GithubProvider the same way if needed.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
        const { data } = await axios.post(`${apiUrl}/api/auth/login`, credentials);
        if (!data?.accessToken) return null;
        return { id: credentials?.email ?? '', email: credentials?.email, accessToken: data.accessToken };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'accessToken' in user) token.accessToken = (user as any).accessToken;
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};
