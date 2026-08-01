/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@triadeflow/db', '@triadeflow/metrics-catalog', '@triadeflow/modules-registry'],
  },
};

module.exports = nextConfig;
