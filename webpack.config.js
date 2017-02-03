const path = require('path');
const webpack = require('webpack');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const entry = PRODUCTION
  ? ['./src/index.js']
  : [
      './src/index.js',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080'
    ]

const plugins = PRODUCTION ? [] : [ new webpack.HotModuleReplacementPlugin() ]

module.exports = {
  entry: entry,
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
       test: /.*\.scss$/,
       loaders: ['style-loader', 'css-loader', 'sass-loader']
     },
     {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  }
};
