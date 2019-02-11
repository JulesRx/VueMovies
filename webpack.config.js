const webpack = require('webpack');
const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
  entry: './src/vue/main.js',
  output: {
    path: path.resolve(__dirname, './src/dist'),
    publicPath: '/src/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin(['src/static'], {}),
    new CleanWebpackPlugin(['src/dist'])
  ]
}

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.plugins.push(
      new WebpackShellPlugin({ onBuildEnd: ['node src/node/app.js'] })
    )
  }

  if (argv.mode === 'production') {
    // config.optimization = {
    //   minimizer: [
    //     new UglifyJsPlugin()
    //   ]
    // }
  }

  return config;
};
