var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
    devtool: 'source-map',
    debug: true,
    target: 'electron-renderer',

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.html']
    },

    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        // Json loader needed to import winston
        preLoaders: [
            { test: /\.json$/, loader: 'json'},
        ],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader'],
                exclude: [ /node_modules/ ]
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["raw-loader", "sass-loader?sourceMap"]
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&publicPath=dist/"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=[name].[ext]" 
            },
            {
                test: /bootstrap\/dist\/js\/umd\//, 
                loader: 'imports?jQuery=jquery'
            }
        ]
    },
};