const webpack = require('webpack');
const path = require("path");

/** 
 * Plugins for webpack
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); // build index.html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // clean folder before build
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy file to build directories

/** 
 * Meta data for index
 */
const METADATA = {
  title: 'Porttfolio',
  baseUrl: '/'
};


/** 
 * Check if running webpckac is in development mode
 */
function isDev() {
  return process.env.NODE_ENV === 'development';
}

config = {
  mode: 'development',
  devtool: isDev() ? 'inline-source-map' : false,

  entry: {
    main: ["./src/app/App.ts"],
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      /** 
       * TSlint loader - to check ts files
       */
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      /** 
       * TS loader - support *.ts files
       */
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ],
      },

      {

        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      /** 
       * JSON loader - support *.json
       */
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      /** 
       * File loader - support images && fonts
      */
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
      /** 
       * HTML loader - support *.html
       */
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js', '.css', '.scss'],
    alias: {
      // ...
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    new HtmlWebpackPlugin({
      title: METADATA.title,
      metadata: METADATA,
      inject: 'head'
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}

module.exports = config;