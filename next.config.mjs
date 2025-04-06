/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },

  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: '/:shortUrlKey',  
        destination: '/api/shorten/:shortUrlKey', 
        permanent: true,  
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: '/:shortUrlKey',
        destination: '/api/shorten/:shortUrlKey', 
      },
    ]
  },
};

export default nextConfig;
