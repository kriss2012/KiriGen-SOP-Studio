/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'kirigen-teamsop-uploads.s3.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
