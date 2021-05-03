const path = require('path');

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
      }
    ]
  },
}