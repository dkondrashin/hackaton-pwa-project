const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.config.js');

baseConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = baseConfig;
