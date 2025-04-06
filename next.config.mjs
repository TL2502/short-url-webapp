/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
      styledComponents: true,
    },
  
    async redirects() {
      return [
        {
          source: '/:shortUrl', 
          destination: '/api/shorten/:shortUrl', 
          permanent: true, 
        },
      ];
    },
  
    async rewrites() {
      return [
        {
          source: '/:shortUrl',
          destination: '/api/shorten/:shortUrl', 
        },
      ];
    },
  
    images: {
      domains: ['short.ly'],  
    },
  };
  
  export default nextConfig;
  