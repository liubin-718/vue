/* 打包公共组建，让别的项目以script + cdn的形式引入 */
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const resolve = path.resolve
module.exports = {
    mode: 'production',
    entry: resolve(__dirname, '../src/share-components/index.js'),
    output: {
        path: resolve(__dirname, '../shareComponent'),
        filename: 'shareComponents.js',
        library: 'shareComponents',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(eot|ttf|otf|woff2?)(\?\S)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {loader: 'url-loader'}
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [ require('autoprefixer') ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}