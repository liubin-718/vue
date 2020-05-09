/* eslint-disabel */
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const path = require('path')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const {
    assets,
    srcPath,
    hashLen,
    postcssLoaderOptions,
    imagesPublicPath,
    prodDistPath,
    publicPath
} = require('../config')

let entrys = utils.getMultiEntry('./src/templates/prd.ejs')
let htmlPlugins = {
    plugins: []
}
let bundleAnalyzerPlugin = {
    plugins: process.env.npm_config_report ? [new BundleAnalyzerPlugin()] : []
}

for (let key in entrys) {
    htmlPlugins.plugins.push(new HtmlWebpackPlugin({
        template: `${srcPath}/templates/${
            entrys[key]
        }`,
        favicon: './src/images/favicon.ico',
        filename: 'index.html',
        chunks: [
            'manifest',
            'vendor',
            'common',
            'mock',
            // 'paxui', 'moment',
            'index'
        ],
        chunksSortMode: 'manual',
        hash: false,
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    }))
}

process.env.NODE_ENV = 'production'
process.noDeprecation = true

module.exports = merge(baseConfig, htmlPlugins, bundleAnalyzerPlugin, {
    output: {
        path: prodDistPath,
        publicPath: publicPath,
        filename: `${assets}/js/[name].js?v=[chunkhash:${hashLen}]`
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: srcPath,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: imagesPublicPath
                        }
                    },
                    'css-loader',
                    'sass-loader', {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, '../src/style/base/mixin.scss')
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: imagesPublicPath
                        }
                    },
                    'css-loader',
                    postcssLoaderOptions
                ]
            }, {
                test: /\.vue$/,
                include: srcPath,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: imagesPublicPath
                                }
                            },
                            'css-loader?sourceMap',
                            'sass-loader',
                            postcssLoaderOptions
                        ]
                    }
                }

            }
        ]
    },
    optimization: {
        minimizer: [
            // js mini
            new UglifyJsPlugin(
                {
                    cache: true,
                    parallel: true,
                    sourceMap: false,
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true, // 移除debugger
                            drop_console: true
                        }
                    }
                }
            ),
            // css mini
            new OptimizeCSSPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                paxui: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]@pa[\\/]/,
                    name: 'paxui',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 100
                },
                vendor: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: -5
                },
                common: {
                    chunks: 'all',
                    test: /[\\/]src[\\/]views[\\/]/,
                    name: 'common',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1
                },
                mock: {
                    chunks: 'all',
                    test: /[\\/]mock[\\/]/,
                    name: 'mock',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            } 
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist/dist-prod')]
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public/assets'),
                to: 'assets',
                ignore: ['.*']
            }
        ]),
        new vueLoaderPlugin(),
        // 配置环境变量  生产环境
        new webpack.DefinePlugin({
            'process.mock': JSON.stringify('mock'),
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.IS_TRACK': JSON.stringify('open'),
        }),
        new MiniCssExtractPlugin({
            filename: `${assets}/css/[name].css?v=[contenthash:${hashLen}]`,
            chunkFilename: `${assets}/css/[name].css?v=[contenthash:${hashLen}]`,
        }),
        // 能使体积更小
        new webpack.LoaderOptionsPlugin({
            minimizer: true
        })
    ],
    performance: {
        hints: false
    },
    devtool: false,
    stats: 'errors-only'
})
