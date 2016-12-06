var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
    devtool: 'source-map',
    debug: true,

    entry: {
        'vendor.bundle': [
            'font-awesome-sass-loader!./src/font-awesome-sass.config.js',
            'rxjs',
            'reflect-metadata',
            '@angular/core',
            '@angular/router',
            '@angular/http',
            '@angular/forms',
            'jquery',
            'bootstrap-loader'
        ],
        'app': './src/app/app'
    },

    output: {
        path: __dirname + '/src/app/dist/',
        publicPath: 'src/app/dist/',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.html']
    },

    module: {
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

    plugins: [
        new CommonsChunkPlugin({ name: 'vendor.bundle', filename: 'vendor.bundle.js', minChunks: Infinity,}),
        new CommonsChunkPlugin({ name: 'common', filename: 'common.js'}),
        new ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            "Tether": 'tether',
            "window.Tether": "tether"
        })
    ]
};