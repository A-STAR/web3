const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

process.env.NODE_ENV = 'production';

const config = require('react-scripts/config/webpack.config')('production');
config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8089 }));

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});
