const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, 'src', 'index.tsx'),
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.(ts|tsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							['@babel/preset-react', { runtime: 'automatic' }],
							'@babel/preset-typescript',
						]
					}
				}
			}
		]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx']
	},
	plugins: [new HtmlWebpackPlugin({ template: 'index.html' }), new BundleAnalyzerPlugin()]
};
