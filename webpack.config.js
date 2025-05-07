const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

// Load environment variables from .env file
const env = dotenv.config().parsed || {};

// Create a new object with only the environment variables we need
const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	mode: "development",
	entry: {
		dashboard: "./src/dashboard/index.tsx",
		background: "./src/background.ts",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: (pathData) =>
			pathData.chunk.name === "background" ? "[name].js" : "[name]/[name].js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.module\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
						},
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "src/manifest.json", to: "" },
				{
					from: "src/dashboard/dashboard.html",
					to: "dashboard/dashboard.html",
				},
			],
		}),
		new webpack.DefinePlugin(envKeys),
	],
	devtool: "source-map",
};
