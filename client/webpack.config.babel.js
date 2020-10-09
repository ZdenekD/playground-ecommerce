import path from 'path';
import chalk from 'chalk';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlReplaceWebpackPlugin from 'html-replace-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ProgressPlugin from 'progress-bar-webpack-plugin';

require('dotenv').config();

const config = require('./config.json');

const isProduction = process.env.NODE_ENV === 'production';
const {entry, output, styles, assets} = config;
const plugins = [];

// HTML webpack plugin
plugins.push(
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true,
            preserveLineBreaks: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
        },
        robots: isProduction ? 'index, follow' : 'noindex, nofollow',
    })
);

// CSS extract plugin
if (styles.extract) {
    plugins.unshift(
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        })
    );
}

// Copy and HTML replace webpack plugins
if (assets) {
    const copy = {patterns: []};
    const replace = [];

    Object.keys(assets).forEach(key => {
        copy.patterns.push({
            from: assets[key],
            to: key,
        });

        replace.push({
            pattern: assets[key],
            replacement: key,
        });
    });

    copy.patterns.push({
        from: './robots.txt',
        to: '',
    });

    plugins.push(new CopyWebpackPlugin(copy), new HtmlReplaceWebpackPlugin(replace));
}

// Image minification plugin
plugins.push(
    new ImageminPlugin({
        disable: !isProduction,
        context: 'src',
        destination: path.resolve(__dirname, output),
        gifsicle: {
            optimizationLevel: 3,
            interlaced: true,
            colors: 10,
        },
        mozjpeg: {
            progressive: true,
            quality: 90,
        },
        pngquant: {
            speed: 1,
            quality: 90,
        },
        svgo: {plugins: [{removeViewBox: false}, {cleanupIDs: true}]},
        webp: {quality: 90},
    })
);

// Favicons plugin
if (config.favicons) {
    plugins.push(new FaviconsWebpackPlugin({...config.favicons}));
}

// Progress bar plugin
plugins.push(new ProgressPlugin({format: `Building [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`}));

module.exports = () => ({
    entry,
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, output),
        publicPath: '/',
    },
    plugins,
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {'react-dom': '@hot-loader/react-dom'},
    },
    devServer: {
        contentBase: path.resolve(__dirname, output),
        historyApiFallback: true,
        noInfo: true,
        port: process.env.WEBPACK_PORT || 3010,
        stats: 'errors-only',
        hot: true,
    },
    devtool: !isProduction ? 'cheap-module-eval-source-map' : '',
    context: __dirname,
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules|vendor/,
                use: [{loader: 'babel-loader?cacheDirectory'}],
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules|vendor/,
                use: [
                    styles.extract
                        ? {
                            loader: MiniCssExtractPlugin.loader,
                            options: {hmr: !isProduction},
                        }
                        : {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: !isProduction ? '[name]-[local]--[hash:base64:6]' : '[hash:base64:8]',
                                context: path.resolve(__dirname, 'src'),
                            },
                            sourceMap: !isProduction,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {sourceMap: 'inline'},
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|webp)$/i,
                exclude: /node_modules|vendor/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: 'images/[hash:base64:8].[ext]'},
                    },
                ],
            },
            {
                test: /\.svg$/,
                exclude: /node_modules|vendor/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(woff|woff2)/,
                exclude: /node_modules|vendor/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: 'fonts/[hash:base64:8].[ext]'},
                    },
                ],
            },
        ],
    },
});
