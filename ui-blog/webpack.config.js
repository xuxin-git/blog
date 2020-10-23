const os = require("os");
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack"); // 多线程
const WebpackMd5Hash = require("webpack-md5-hash");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin"); // 按需加载lodash
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin"); // 缓存依赖
const CopyWebpackPlugin = require("copy-webpack-plugin"); // copy静态文件
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清除文件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 压缩js
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const AntDesignThemePlugin = require("antd-theme-webpack-plugin"); //主题
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //分析工具
const WebpackBar = require("webpackbar"); // 显示编译时间
var openBrowser = require("react-dev-utils/openBrowser");

const publicPath = "./";
var host = "0.0.0.0"; // ip地址
var port = "8666"; // 端口

// 打开浏览器
// var url = `http://${host === "0.0.0.0" ? "localhost" : host}:${port}`;
// if (openBrowser(url)) {
//     console.log("The browser tab has been opened!");
// }

// 多线程
const happyThreadPool = HappyPack.ThreadPool({
    size: Math.max(1, os.cpus().length - 1)
}); // 设置最大cpu数 - 1

// 抽离静态资源
const AutoDllPlugin = require("autodll-webpack-plugin");
const Dll = [
    "react",
    "react-dom",
    "react-router-dom",
    "moment",
    "lodash",
    "draft-js",
    "axios",
    "prop-types"
];

// 主题配置
const themeOptions = {
    antDir: path.join(__dirname, "./node_modules/antd"),
    stylesDir: path.join(__dirname, "./assets/css"),
    varFile: path.join(__dirname, "./assets/css/variables.less"),
    mainLessFile: path.join(__dirname, "./assets/css/global.less"),
    themeVariables: ["@primary-color", "@layout-header-background"],
    indexFileName: false,
    // lessUrl: 'assets/js/less.min.js',
    publicPath: "."
};
const themePlugin = new AntDesignThemePlugin(themeOptions);

var app = ["@babel/polyfill", "./src/index.js"]; // 添加polyfill

module.exports = (env, argv) => {
    const isDev = argv.mode === "development"; // 是否开发环境

    var cssOptions = {
        // only enable hot in development
        hmr: isDev,
        // if hmr does not work, this is a forceful method.
        reloadAll: true
    };

    const output = !isDev
        ? {
              filename: "assets/js/[name].[hash:8].js",
              chunkFilename: "assets/js/chunk/[name].[hash:8].chunk.js",
              path: path.resolve("./dist"), //必须是绝对路径
              publicPath: publicPath
          }
        : { path: path.resolve("./dist"), filename: "assets/js/[name].js" };

    return {
        entry: app,
        output: output,
        devtool: isDev ? "inline-source-map" : false, // 线上去掉map文件
        resolve: {
            //自动补全后缀
            extensions: [".js", ".jsx", ".scss", ".less", ".css"],
            alias: {
                assets: path.join(__dirname, "/assets"),
                src: path.join(__dirname, "/src"),
                app: path.join(__dirname, "/src/app"),
                components: path.join(__dirname, "/src/app/components"),
                models: path.resolve(__dirname, "./src/models"),
                utils: path.join(__dirname, "/src/utils"),
                images: path.join(__dirname, "/assets/images")
            }
        },
        stats: {
            // One of the two if I remember right
            entrypoints: false,
            children: false
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        // node_modules内的依赖库
                        chunks: "initial", //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100 // 该配置项是设置处理的优先级，数值越大越优先处理
                    },
                    common: {
                        // ‘src/js’ 下的js文件
                        chunks: "all",
                        test: /[\\/]src[\\/]/, // 也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
                        name: "common", // 生成文件名，依据output规则
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 1
                    }
                }
            },
            minimizer: isDev
                ? []
                : [
                      new UglifyJsPlugin({
                          cache: true,
                          parallel: true,
                          sourceMap: false, // set true is you want JS source map
                          uglifyOptions: {
                              ecma: 6,
                              warnings: false,
                              compress: {
                                  drop_debugger: true,
                                  drop_console: true
                              }
                          }
                      }),
                      new OptimizeCssAssetsPlugin({
                          assetNameRegExp: /\.css$/g,
                          cssProcessor: require("cssnano"),
                          cssProcessorPluginOptions: {
                              preset: [
                                  "default",
                                  { discardComments: { removeAll: true } }
                              ]
                          },
                          canPrint: true
                      })
                  ]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    include: path.resolve(process.cwd(), './src'),
                    use: [ 'happypack/loader?id=js' ]
                },
                {
                    test: /\.css$/,
                    include: /(node_modules|assets)/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    include: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        },
                        {
                            loader: 'css-loader' // translates CSS into CommonJS
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader', // compiles Less to CSS
                            options: {
                                modifyVars: {
                                    // '@primary-color': '#2cb0b5'
                                    //   "@font-family": "Arial, 微软雅黑"
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    include: /assets/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../',
                                ...cssOptions
                            }
                        },
                        {
                            loader: 'css-loader' // translates CSS into CommonJS
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader' // compiles Less to CSS
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    include: /src/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../../',
                                ...cssOptions
                            }
                        },
                        {
                            loader: 'css-loader?modules&localIdentName=[local]-[hash:base64:5]'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader' // compiles Less to CSS
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        outputPath: 'assets/images',
                        name: '[name].[hash:base64:8].[ext]'
                    }
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: '@svgr/webpack',
                            options: {
                                babel: false,
                                icon: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
                    loader: 'file-loader'
                }
            ]
        },
        plugins: [
            // new HardSourceWebpackPlugin({
            //     configHash: function(webpackConfig) {
            //         return require("node-object-hash")({ sort: false }).hash(
            //             webpackConfig
            //         );
            //     },
            //     environmentHash: {
            //         root: process.cwd(),
            //         directories: [],
            //         files: ["package-lock.json", "yarn.lock"]
            //     },
            //     info: {
            //         mode: "none", // 'none' or 'test'.
            //         level: "debug" // 'debug', 'log', 'info', 'warn', or 'error'.
            //     },
            //     cachePrune: {
            //         maxAge: 2 * 24 * 60 * 60 * 1000,
            //         sizeThreshold: 50 * 1024 * 1024
            //     }
            // }),
            new WebpackBar(),
            new LodashModuleReplacementPlugin({
                paths: true // Deep property path support for methods like _.get, _.has, & _.set.
            }),
            new HappyPack({
                // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
                id: 'js',
                // 如何处理 .js 文件，用法和 Loader 配置中一样
                loaders: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: isDev
                        }
                    }
                ],
                // 使用共享进程池中的子进程去处理任务
                threadPool: happyThreadPool
                // ... 其它配置项
            }),
            new HtmlWebpackPlugin({
                favicon: './favicon.ico',
                template: path.resolve(__dirname, 'index.ejs'),
                inject: true,
                hash: false
            }),
            new AutoDllPlugin({
                context: path.join(__dirname, './'),
                inject: true, // will inject the DLL bundle to index.html
                debug: true,
                filename: '[name]_[hash:5].dll.js',
                path: './assets/js/dll',
                entry: {
                    vendor: Dll
                },
                plugins: isDev
                    ? [
                        new webpack.DefinePlugin({
                            // 定义全局变量
                            'process.env': {
                                NODE_ENV: JSON.stringify('production')
                            }
                        })
                    ]
                    : []
            }),
            // 定义全局变量React指向react库就不用每次import react
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                React: 'react',
                PropTypes: 'prop-types',
                classNames: 'classnames'
            }),
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].[contenthash:8].css',
                chunkFilename: 'assets/css/[name].[contenthash:8].css'
            }),
            // css变化时不会影响js的hash，参看hash,chunkhash,contenthash的区别
            new WebpackMd5Hash(),
            new ManifestPlugin(),
            new CopyWebpackPlugin([
                {
                    from: './assets/js',
                    to: path.resolve(__dirname, './dist/assets/js'),
                    toType: 'dir'
                }
            ]),
            new CleanWebpackPlugin('./dist/*', {
                root: __dirname,
                verbose: false, //关闭日志
                dry: false
            }),
            themePlugin,
            // new BundleAnalyzerPlugin(),
            // 只加载locale zh-cn文件
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
            new webpack.HotModuleReplacementPlugin()
        ],
        // 开发服务器
        devServer:  {
            stats: "errors-only",
            historyApiFallback: true, //让所有404的页面定位到index.html
            host,
            port,
            compress: true, // 服务器压缩
            hot: true, //热更新
            inline: true,
            disableHostCheck: true, //解决 Invalid Host/Origin header
            proxy: {
                //通过代理解决本地跨域
                "/api": {
                    target: "http://localhost:8000",
                    changeOrigin: true,
                    pathRewrite: {
                        "^/api": ""
                    }
                }
            },
            clientLogLevel: "none" //关闭webpack控制台输出
        }
    };
};
