const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: resolve("./public/index"),
	output: {
		filename: "posterror.bundle.js",
		libraryTarget: "umd",
		library: "postError",
		path: path.resolve(__dirname, "../test-dist"),
	},
	// devtool: 'source-map',   // 生成 source-map
	// devServer: {			 // 热更新
	// 	contentBase: './dist',
	// 	// hot: true			 // 局部热更新
	// },
	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				use: "ts-loader",
				exclude: /node_modules/,
                // happyPackMode: true
			},
		],
    },
    resolve: {
		extensions: [ ".ts", ".tsx", ".js"],
		alias: {
			'@src': resolve( 'src'),
			'@assets': resolve( 'assets'),
			'@config': resolve( 'config'),
			'@service': resolve( 'service'),
			'@': resolve( 'src'),

		  }
    },
	plugins: [
		new CleanWebpackPlugin(),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "common", // 指定公共 bundle 的名称。
		// }),
		// new webpack.NamedModulesPlugin(),
		// new webpack.HotModuleReplacementPlugin()
	],
};
