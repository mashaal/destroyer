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
      loader: 'babel',
      query: {
        cacheDirectory: true
      }
    }, {
      test: /\.(svg|png|jpg|webm|mp4|woff|woff2)$/,
      loader: 'url-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.join(__dirname, 'src')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  ]
}

module.exports = config
