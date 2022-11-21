const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: "/\.png/",
				type: 'asset/resource'
			}
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		static: path.join(__dirname, "dist"),
		compress: true,
		port: 4000,
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(__dirname, "src/assets/"), to: path.resolve(__dirname, "dist/assets") },
			]
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			hash: true,
			minify: false,
		}),
	],
	performance: { hints: false },
};
