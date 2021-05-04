const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // Enter pint of our application
  entry: './src/index.js',
  // Path output directon
  output: {
    // What is the directory of our project and the output path name
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js', // The name of out JS output file
  },
  // Extensions that he need to work with
  resolve: {
    extensions: ['.js'] // Array of extension that webpack needs to identify in our project
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
    new MiniCssExtractPlugin(),
    // Plugin to copy elements to dist folder like images
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets/images'), // Here is where the files that we want to move are
          to: 'assets/images' // The final path to move the files
        }
      ]
    }),
  ]
}