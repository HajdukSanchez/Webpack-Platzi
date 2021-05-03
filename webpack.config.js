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
  }
}