
var webpackConfig = require('./webpack.config.js');

module.exports = Object.assign({}, webpackConfig, { 
    entry : {
        'app': './src/app/app.ts' 
    }
});