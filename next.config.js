/** @type {import('next').NextConfig} */
const nextConfig = {
    // pagesDir: "./src/app",
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['gateway.pinata.cloud'],
      },
}

module.exports = nextConfig
