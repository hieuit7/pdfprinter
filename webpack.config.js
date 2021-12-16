const path = require('path');

module.exports = {
  entry: ['./src/canvas.js','./src/printer.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  experiments: {
      topLevelAwait: true
    }
};