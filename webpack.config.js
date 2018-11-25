var path = require("path");

var HtmlWebpackPlugin = require('html-webpack-plugin'); // build index.html
var CleanWebpackPlugin = require('clean-webpack-plugin'); // clean folder before build
var CopyWebpackPlugin = require('copy-webpack-plugin'); // copy file to build directories
var MiniCssExtractPlugin = require('mini-css-extract-plugin'); // for Webpack 4 instead extract..

var devMode = process.env.NODE_ENV !== 'production'

module.exports = function (env) {

  return {
    entry: {
      app: path.resolve(__dirname, 'src/app/app.ts'),
    },
    output: {
      path: __dirname + '/dist',
      filename: 'js/[name].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: { // set webpack and Typescript alias
        '@fonts': path.resolve(__dirname, './src/assets/fonts'),
        '@images': path.resolve(__dirname, './src/assets/images'),
        '@pages': path.resolve(__dirname, 'src/app/pages'),
        '@shared': path.resolve(__dirname, 'src/app/shared'),
        '@styles': path.resolve(__dirname, './src/styles'),
      }
    },

    module: {
      rules: [{
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
          }
        },
        {
          test: /\.(css|sass|scss)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'tslint-loader'
        },
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: /node_modules/,
          use: [
            'file-loader'
          ]
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new CopyWebpackPlugin([{
          from: 'src/public/fonts',
          to: 'fonts'
        },
        {
          from: 'src/public/images',
          to: 'images'
        }
      ]),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/public/index.html'),
      }),
    ],
    devtool: 'inline-source-map',
    externals: [],
    devServer: {
      compress: true,
      port: 9000,
      contentBase: './src',
      publicPath: '/',
    }
  };
};