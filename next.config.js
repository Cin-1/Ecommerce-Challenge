require('dotenv').config()

module.exports = {
  env: {
    STRIPE_PUBLISHABLE: process.env.STRIPE_PUBLISHABLE,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|mp4|mp3|pdf)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    return config
  }
}
