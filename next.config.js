/** @type {import('next').NextConfig} */
const nextConfig = {
  // make a static output at this stage
  output: 'export',
  // fixes css not working
  assetPrefix: './'
}

module.exports = nextConfig
