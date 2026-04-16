/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/api/**': ['./data/**/*'],
  },
  outputFileTracingExcludes: {
    '*': ['node_modules/**/*'],
  },
};
module.exports = nextConfig;
