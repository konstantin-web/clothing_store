let path = require('path');
var webpack = require('webpack');
let conf = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname,"./dist"),
		filename: 'main.js',
		publicPath: 'dist/',
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/',
			},
			{
			      test: /\.less$/,
			      use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            },


            ], // compiles Less to CSS
    }			],
    
		  }
		};
module.exports = conf;