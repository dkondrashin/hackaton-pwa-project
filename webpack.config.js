const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TSLintPlugin = require("tslint-webpack-plugin");
const devServerConfig = require('./dev-server.config');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: devServerConfig,
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.styl'],
        modules: [path.resolve(__dirname, './src'), 'node_modules']
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
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new TSLintPlugin({
            files: ['src/**/*.ts?(x)'],
            project: 'tsconfig.json',
            typeCheck: true,
            waitForLinting: false
        })
        // new WorkboxPlugin.GenerateSW({
        //     swDest: './build/sw.js',
        //     globDirectory: './src',
        //     globPatterns: '[**/*.{js,css,html,png}]',
        // })
    ]
};
