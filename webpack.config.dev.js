// Development mode file
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Enter pint of our application
  entry: './src/index.js',
  // Path output directon
  output: {
    // What is the directory of our project and the output path name
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // The name of out JS output file, the output file is going to be identifying with a hash
    assetModuleFilename: 'assets/images/[hash][ext][query]' // The filename for images an her directory
  },
  // Configuration mode
  mode: 'development',
  // Extensions that he need to work with
  resolve: {
    extensions: ['.js'], // Array of extension that webpack needs to identify in our project
    // Alias for directorie paths of the projects
    alias: {
      // With the at (@) webpack identify that it is an alias
      // The second parameter is the path of our utils
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  // When we are going to add the configuration of babel plugin for JS
  module: {
    // Configurations for modules
    rules: [
      // Object for work with babel loader and connect our webpack with babel
      {
        test: /\.m?js$/, // This expression are going to tell us how can i work with diferents extensions
        exclude: /node_modules/,  // To tell him that not use NodeModules JS files
        use: {
          loader: 'babel-loader' // The loader that he going to use
        }
      },
      // Rule for recognize CSS
      {
        test: /\.css|.styl$/i, // The I gave us the oportunity to recognize the CSS and Stylus files (or another preprocessor)
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
      // Rule for png images
      {
        test: /\.png/, // Loader for images, to convert it to base 64
        type: 'asset/resource' // That is a resorce for images that webpack have
      },
      // Rule for fonts
      {
        test: /\.(woff|woff2)$/, // Read Woff or Woff2 files
        use: {
          loader: 'url-loader',
          options: { // Configuration options
            limit: 10000,
            MimeType: 'application/font-woff', // Data type taht we are use
            name: '[name].[contenthash].[ext]', // The output filename, in this case the output file is going to have the original name and extension
            outputPath: './assets/fonts/', // The final Location
            publicPath: '../assets/fonts/', // The public path directory
            esModule: false
          }
        }
      }
    ]
  },
  // Plugins that we are going to use
  plugins: [
    // HTML plugin
    new HtmlWebpackPlugin({
      inject: true, // For insert the elements
      template: './public/index.html', // Location of out Template
      filename: './index.html' // Compilation file name and path
    }),
    // CSS Plugin
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    // Plugin to copy elements to dist folder like images
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets/images'), // Here is where the files that we want to move are
          to: 'assets/images' // The final path to move the files
        }
      ]
    }),
    // Plugin for environment variables
    new Dotenv(),
  ],
}