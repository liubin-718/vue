/* eslint-disable */
// const pxtorem = require('postcss-pxtorem')
// const rootValue = 37.5
let {resolve} = require('path')
let devServer = require('./dev') // 开发环境配置 项目开发中不提交

const env = process.argv[process.argv.length - 1]

module.exports = {
    assets: 'assets', // 打包后静态资源子目录
    hashLen: 8,
    publicPath: env === 'production' ? './' : '/',
    srcPath: resolve(__dirname, '../src'), // 项目源代码目录
    mockPath: resolve(__dirname, '../mock'),
    rootPath: resolve(__dirname, '../dist'), // production环境打包后静态资源根目录
    prodDistPath: resolve(__dirname, '../dist/dist-prod'),
    mockDistPath: resolve(__dirname, '../dist/dist-fat1'),
    fat2DistPath: resolve(__dirname, '../dist/dist-fat2'),
    devTestPath: resolve(__dirname, '../dist/dist-dev'),
    limit: 1024*5, //url-loader limit参cls
    devServer: devServer,
    bundleAnalyzer: false,
    // rootValue: rootValue,
    imagesPublicPath: '../../',
    postcssLoaderOptions: {
        loader: 'postcss-loader',
        options: {
            plugins: [
                require("autoprefixer")
            ]
        }
    }

}
