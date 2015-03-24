var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Peach for Businesses',
      template: 'src/index.html',
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "'" + process.env.NODE_ENV + "'"
    })
  ],
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel-loader'], exclude: /node_modules\/(?!react-autocomplete)/ }
    ]
  }
};
