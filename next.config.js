/** @type {import('next').NextConfig} */
const nextConfig = {
  // make a static output at this stage
  output: 'export',
  // github pages needs to point to either root or `/docs`, so thus it is
  distDir: 'docs'
}

module.exports = nextConfig
