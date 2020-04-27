const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TSLintPlugin = require("tslint-webpack-plugin");
const devServerConfig = require('./../dev-server.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootPath = require('path').resolve(__dirname, './../');
const isDev = process.env.NODE_ENV === 'dev';
const isProd = process.env.NODE_ENV === 'prod';
const hashStrategy = isDev ? 'hash' : 'contentHash';

module.exports = {
    entry: {
        main: './src/index.tsx'
    },
    output: {
        path: path.resolve(rootPath, 'public'),
        filename: 'main.[' + hashStrategy + ':8].js'
    },
    devServer: devServerConfig,
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.styl'],
        modules: [path.resolve(rootPath, './src'), 'node_modules'],
        alias: {
            '@style': path.resolve(rootPath, 'src/style')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: "awesome-typescript-loader"
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: { minimize: true }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            },
            {
                test: /\.styl$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "stylus-loader"]
            },
            {
                test: /\.js/,
                enforce: "pre",
                loader: "source-map-loader"
            },
            {
                test: /\.(svg|png|gif|jpe?g|woff2?)$/,
                loader: "file-loader",
                options: {
                    publicPath: 'public',
                }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[' + hashStrategy + ':8].css'
        }),
        new TSLintPlugin({
            files: ['src/**/*.ts?(x)'],
            project: 'tsconfig.json',
            typeCheck: true,
            waitForLinting: false
        }),
        new CopyWebpackPlugin([
            { from: 'service-worker.js', to: 'service-worker.js' },
            { from: 'manifest.json', to: 'manifest.json' },
            { from: 'src/images', to: 'images' }
        ])
        // new WorkboxPlugin.GenerateSW({
        //     swDest: './build/sw.js',
        //     globDirectory: './src',
        //     globPatterns: '[**/*.{js,css,html,png}]',
        // })
    ]
};
