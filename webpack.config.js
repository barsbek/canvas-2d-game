const path= require('path');

module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle/main.js'
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
}

