const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(common, {
    
	optimization: {
		minimizer: [
			new TerserPlugin({
			  cache: true,
			  parallel: true,
			  sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
			  terserOptions: {
				// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
			  }
			}),
		  ],
		  splitChunks: {
			chunks: "all",   // 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
			minSize: 30000,   // （默认值：30000）块的最小大小
			minChunks: 1,    // （默认值：1）在拆分之前共享模块的最小块数
			maxAsyncRequests: 5,   //（默认为5）按需加载时并行请求的最大数量
			maxInitialRequests: 3,  //（默认值为3）入口点的最大并行请求数
			automaticNameDelimiter: '-',  // 默认情况下，webpack将使用块的来源和名称生成名称，例如vendors~main.js
			name: true,
			cacheGroups: {  // 以上条件都满足后会走入cacheGroups进一步进行优化的判断
				vendors: {
					test: /[\\/]node_modules[\\/]/,  // 判断引入库是否是node_modules里的
					priority: -10,   // 数字越大优先级越高 （-10大于-20）
					filename: 'vendors.js'  // 设置代码分割后的文件名
        		},
				default: {   //所有代码分割快都符合默认值，此时判断priority优先级
					minChunks: 2,  
					priority: -20,
					reuseExistingChunk: true   // 允许在模块完全匹配时重用现有的块，而不是创建新的块。
				}
			}
    	}
	},
	mode: "production",
});
