const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
//   mode: 'production',
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  plugins: [  // Array of plugins to apply to build chunk
      new HtmlWebpackPlugin({
          template: __dirname + "/index.html",
          inject: 'body',
          minify: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true,
          }
      }),
      new CopyPlugin([
        { from: 'assets', to: 'assets' },
        { from: 'manifest.json', to: '' },
        { from: 'serviceWorker.js', to: '' },
      ]),
      // new ConcatPlugin({
      //   uglify: true,
      //   sourceMap: false,
      //   name: 'static',
      //   // outputPath: 'path/to/output/',
      //   fileName: '[name].js',
      //   filesToConcat: ['./static/assets/js/**'],
      //   attributes: {
      //       async: true
      //   }
      // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true,
          }
        }
      }
    ]
  },
  output: {
    filename: 'app.bundle.js',
    chunkFilename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    inline: true,
    // hot: true,
    // historyApiFallback: {
    //   index: '/src/index.html'
    // }
  },
};