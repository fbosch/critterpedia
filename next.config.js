const withOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })
const withPlugins = require('next-compose-plugins')
const withOptimizedImages = require('next-optimized-images')

const imageOptions = {
  imagesPublicPath: '/public/assets/images',
  imagesOutputPath: '/assets/images',
}

const plugins = [withOffline, [withOptimizedImages, imageOptions], withBundleAnalyzer]

module.exports = withPlugins(plugins, {
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /\.(png|jpg|gif|svg|eot|ttf|otf|woff|woff2)$/,
        handler: 'CacheFirst',
      },
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(gif|svg|eot|ttf|otf|woff|woff2)$/,
      loader: 'file-loader',
    })
    // config.module.rules.push({
    //   test: /\.(jpe?g|png)$/i,
    //   loaders: ['file-loader', 'webp-loader'],
    // })
    return config
  },
})
