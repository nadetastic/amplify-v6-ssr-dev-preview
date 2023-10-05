const { withAmplify } = require('@aws-amplify/adapter-nextjs/with-amplify');
const config = require('./src/amplifyconfiguration.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your Next.js app configuration
}

module.exports = withAmplify(nextConfig, config);