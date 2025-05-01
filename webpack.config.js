const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

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
	],
	devtool: "source-map",
};
