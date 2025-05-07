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
		app: "./src/app/index.tsx",
		background: "./src/background.ts",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: (pathData) =>
			pathData.chunk.name === "background" ? "[name].js" : "[name]/[name].js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@components": path.resolve(__dirname, "components"),
			"@app": path.resolve(__dirname, "src/app"),
			"@lib": path.resolve(__dirname, "lib"),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "src/manifest.json", to: "" },
				{
					from: "src/app/app.html",
					to: "app/app.html",
				},
				{
					from: "src/app/app.html",
					to: "dashboard/dashboard.html",
				},
			],
		}),
		new webpack.DefinePlugin(envKeys),
	],
	devtool: "source-map",
};
