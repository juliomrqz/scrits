const path = require('path');

const BundleTrackerPlugin  = require('webpack-bundle-tracker');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, './dist')
  },
  plugins: [
    new BundleTrackerPlugin({ path: __dirname, filename: "./webpack-stats.json" }),
    new WriteFilePlugin()
  ]
};
