const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
var minimist = require('minimist');
const webpack = require("webpack");
const path= require("path");
const args = minimist(process.argv);
const PORT = args.prod && Number(args.prod);


var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(common, {
	devtool: "source-map",
	mode: 'development',
	devServer: {
		contentBase: [path.join(__dirname, '../src'),path.join(__dirname,"../public")],
		compress: true,
		port: PORT || 9000,
		host:'0.0.0.0'
	},
	plugins: [new HtmlWebpackPlugin({
		title:"test",
		filename:"../dist/index.html",
		template:path.join(__dirname,"../public/test.html"),
		inject:"head",
		minify: {
			//是否对大小写敏感，默认false
		   caseSensitive: true,
		   
		   //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
		   collapseBooleanAttributes: true,
		   
		   //是否去除空格，默认false
		   collapseWhitespace: true,
		   
		   //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
		   minifyCSS: true,
		   
		   //是否压缩html里的js（使用uglify-js进行的压缩）
		   minifyJS: false,
		   
		   //Prevents the escaping of the values of attributes
		   preventAttributesEscaping: true,
		   
		   //是否移除属性的引号 默认false
		   removeAttributeQuotes: true,
		   
		   //是否移除注释 默认false
		   removeComments: true,
		   
		   //从脚本和样式删除的注释 默认false
		   removeCommentsFromCDATA: true,
		   
		   //是否删除空属性，默认false
		   removeEmptyAttributes: true,
		   
		   //  若开启此项，生成的html中没有 body 和 head，html也未闭合
		   removeOptionalTags: false, 
		   
		   //删除多余的属性
		   removeRedundantAttributes: true, 
		   
		   //删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
		   removeScriptTypeAttributes: true,
		   
		   //删除style的类型属性， type="text/css" 同上
		   removeStyleLinkTypeAttributes: true,
		   
		   //使用短的文档类型，默认false
		   useShortDoctype: true,
		   }
	})]
});
