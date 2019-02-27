/* eslint-env node */

/**************************
 * @file: webpack配置
 * @author: leinov
 * @date: 2018-10-08
 * @update: 2018-11-04 优化html文件
 * 1.修改htmlConfig.js
 * 2.在页面文件夹下添加pageinfo.json
 ***************************/

const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");//js压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css压缩
const createHtml = require("./config/create-html");// html配置
const getEntry = require("./config/get-entry");
const entry = getEntry("./src/pages");
const htmlArr = createHtml("./src/pages");
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const HappyPack = require('happypack'); // 多线程编译
const minimize = {
  dev: false,
  development: false,
  production: true,
};
//主配置
module.exports = (env, argv) => ({
	entry: entry,
	output: {
		path: path.join(__dirname, "build"),
		filename: "[name].js"
	},
	module: {
		rules: [
			// {
			// 	test: /\.js$/,
			// 	exclude: /node_modules/,
			// 	use: {
			// 		loader: "babel-loader",
			// 		options: {
			// 			presets: [
			// 				"@babel/preset-env",
			// 				"@babel/preset-react",
			// 				{ "plugins": ["@babel/plugin-proposal-class-properties"]} //这句很重要 不然箭头函数出错
			// 			],
			// 		}
			// 	},
			// },
		  {
        // .js .jsx用babel解析
        test: /\.js?$/,
        use: ['happypack/loader'],
        include: path.resolve(__dirname, 'src'),
      },
			// {
			// 	test: /\.css$/,
			// 	use: ["style-loader", "css-loader"],
			// 	exclude: /node_modules/,
			// },
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 	  require.resolve('style-loader'),
			// 	  {
			// 		loader: require.resolve('css-loader'),
			// 		options: {
			// 		  importLoaders: 1,
			// 		},
			// 	  },
			// 	  {
			// 		loader: require.resolve('postcss-loader'),
			// 		options: {
			// 		  // Necessary for external CSS imports to work
			// 		  // https://github.com/facebookincubator/create-react-app/issues/2677
			// 		  ident: 'postcss',
			// 		  plugins: () => [
			// 			require('postcss-flexbugs-fixes'),
			// 			autoprefixer({
			// 			  browsers: [
			// 				'>1%',
			// 				'last 4 versions',
			// 				'Firefox ESR',
			// 				'not ie < 9', // React doesn't support IE8 anyway
			// 			  ],
			// 			  flexbox: 'no-2009',
			// 			}),
			// 		  ],
			// 		},
			// 	  },
			// 	],
			//   },
			{
        // .css 解析
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        // .less 解析
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }],
      },
      {
        // .sass 解析
        test: /\.scss$/,
       // include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
			{
        // 文件解析
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        //include: path.resolve(__dirname, 'src'),
        use: ['file-loader?name=assets/[name].[ext]'],
      },
      {
        // 图片解析
        test: /\.(png|jpg|gif)(\?|$)/,
        include: path.resolve(__dirname, 'src'),
        use: ['url-loader?limit=8192&name=assets/[name].[ext]'],
      },
      {
        // wasm文件解析
        test: /\.wasm$/,
        include: path.resolve(__dirname, 'src'),
        type: 'webassembly/experimental',
      },
      {
        // xml文件解析
        test: /\.xml$/,
        include: path.resolve(__dirname, 'src'),
        use: ['xml-loader'],
      },

		],
	},
	devServer: {
		port: 3100,
		open: true,
		"proxy": {
			"/v2": {
			  "target": "http://localhost:8080",
			  "changeOrigin": true
			},
			"/upload": {
			  "target": "http://localhost:8080",
			  "changeOrigin": true
			},
			"/api": {
			  "target": "http://zhixiao.cn",
			  "changeOrigin": true
			}
		  },
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, "src/"),
			component: path.resolve(__dirname, "src/component/"),
			store: path.resolve(__dirname, "src/store/"),
		}
	},
	plugins: [
		...htmlArr, // html插件数组
		new MiniCssExtractPlugin({ //分离css插件
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new HappyPack({
      loaders: ['babel-loader'],
    })
		 
	],
	optimization: {
		minimizer: [//压缩js
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSAssetsPlugin({})
		],
		splitChunks: { //压缩css
			cacheGroups: {
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true
				},
				// common: {
				// 	name: "common",
				// 	chunks: "all",
				// 	minSize: 1,
				// 	priority: 0
				//   },
				// vendor: { 
				// 	test: /node_modules/, 
				// 	chunks: "initial", 
				// 	name: "vendor", 
				// 	priority: 10, 
				// 	enforce: true 
				// }
			},
			
		}
	}
});
