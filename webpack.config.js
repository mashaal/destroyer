const path = require('path')
const webpack = require('webpack')
const cssnext = require('postcss-cssnext')
const reporter = require('postcss-reporter')

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
  postcss: [
    cssnext,
    reporter({clearMessages: true})
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  config.module.loaders.push({
    test: /\.(css|postcss)$/,
    loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer&modules!postcss')
  })
  config.plugins.push(
    new ExtractTextPlugin('destroyer.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
} else {
  // config.entry.push('webpack-hot-middleware/client')
  config.module.loaders.push({
    test: /\.(css|postcss)$/,
    loader: 'style!css?-autoprefixer&modules!postcss'
  })
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}

module.exports = config
