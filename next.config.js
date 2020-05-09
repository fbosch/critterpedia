const withOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })

module.exports = withBundleAnalyzer(withOffline({
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /\.(png|jpg|gif|svg|eot|ttf|otf|woff|woff2)$/,
        handler: 'CacheFirst'
      },
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200
          }
        }
      }
    ]
  },
  webpack (config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    })
    return config
  }
}))
