const withFonts = require('next-fonts');

module.exports = withFonts({
  reactStrictMode: true,
  enableSvg: true,
  trailingSlashes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, options) {
    return config;
  },
  distDir: 'build'
}); 