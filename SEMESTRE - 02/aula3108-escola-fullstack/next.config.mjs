/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/listanotas',
        destination: '/listnota',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
