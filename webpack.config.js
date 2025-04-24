// webpack.config.js
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		popup: "./src/popup/index.tsx",
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
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "src/manifest.json", to: "" },
				{ from: "src/popup/popup.html", to: "popup/popup.html" },
				{
					from: "src/dashboard/dashboard.html",
					to: "dashboard/dashboard.html",
				},
			],
		}),
	],
	devtool: "source-map",
};
