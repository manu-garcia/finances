var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

var webpackConfig = require('./webpack.config.js');

module.exports = Object.assign({}, webpackConfig, { 
    externals: [

    ],
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
            'bootstrap-loader',
            'ag-grid',
            'ag-grid-angular'
        ],
        'vendor.bundle.css': [
            'ag-grid/dist/styles/ag-grid.css',
            'ag-grid/dist/styles/theme-fresh.css',
        ],
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
});