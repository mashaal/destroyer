const path = require('path')

const config = {
  entry: './client.js',
  output: {
    path: path.join(__dirname, 'bundle'),
    publicPath: '/bundle/',
    filename: 'destroyer.js'
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                  importSource: '@emotion/react'
                }
              ]
            ],
            plugins: ["@emotion/babel-plugin"]
          }
        }
      },
      {
        test: /\.(png|woff|woff2)$/,
        use: {
          loader: 'url-loader'
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

module.exports = config
