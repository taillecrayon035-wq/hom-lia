/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingExcludes: {
    '*': ['node_modules/**/*'],
  },
};
module.exports = nextConfig;
