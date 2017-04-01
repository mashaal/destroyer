const path = require('path')
const webpack = require('webpack')

const config = {
  entry: [
    path.join(__dirname, '/client.js')
  ],
  output: {
    path: path.join(__dirname, '/bundle'),
    publicPath: '/bundle/',
    filename: 'destroyer.js'
  },
  target: 'electron',
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true
      }
    }, {
      test: /\.(svg|png|jpg|webm|mp4|woff|woff2)$/,
      loader: 'url-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  )
} else {
  config.devtool = 'eval'
  config.plugins.push(new webpack.NoErrorsPlugin())
}

module.exports = config
