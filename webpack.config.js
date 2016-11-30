var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    devtool: 'source-map',
    debug: true,

    entry: {
        'angular2': [
            'font-awesome-sass-loader!./src/font-awesome-sass.config.js',
            'rxjs',
            'reflect-metadata',
            '@angular/core',
            '@angular/router',
            '@angular/http'
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
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=../../../../../resources/fonts/[name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader" 
            }
        ]
    },

    plugins: [
        new CommonsChunkPlugin({ name: 'angular2', filename: 'angular2.js', minChunks: Infinity,}),
        new CommonsChunkPlugin({ name: 'common', filename: 'common.js'})
    ]
};