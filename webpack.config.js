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
        test: /\.(woff|woff2)$/,
        type: 'asset/resource'
      },
      {
        test: /\.png$/,
        type: 'asset/inline'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

module.exports = config
