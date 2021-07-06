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
  distDir: 'build',
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
    }
  },
  images: {
    loader: "imgix",
    path: "",
  }
}); 