/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ijgjorrbv0sd9i61.public.blob.vercel-storage.com'],
  },
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },

}

module.exports = nextConfig
