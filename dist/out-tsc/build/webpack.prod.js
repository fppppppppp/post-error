const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(common, {
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            }),
        ],
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    filename: 'vendors.js' // 设置代码分割后的文件名
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true // 允许在模块完全匹配时重用现有的块，而不是创建新的块。
                }
            }
        }
    },
    mode: "production",
});
//# sourceMappingURL=webpack.prod.js.map