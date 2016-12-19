var gulp = require('gulp');
var livereload = require('gulp-livereload');
var webpackStream = require('webpack-stream');

var appWebpackConfig = require('./webpack.config.app.js');
var vendorWebpackConfig = require('./webpack.config.vendor.js');

var paths = {
    electron: './electron',
    build: './electron/dist'
}

gulp.task('clean', function () {

});

gulp.task('webpack-vendor', function () {

    return gulp.src('vendor.bundle')
        .pipe(webpackStream(vendorWebpackConfig))
        .pipe(gulp.dest(paths.build));

});

gulp.task('webpack-app', function () {

    return gulp.src('./src/app/app.ts')
        .pipe(webpackStream(appWebpackConfig))
        .pipe(gulp.dest(paths.build))
        .pipe(livereload());

});

gulp.task('build', ['webpack-vendor', 'webpack-app'], function () {

});

gulp.task('watch', ['build'], function () {
    livereload ({ basePath: paths.build, port: 35729})
    livereload.listen();
    return gulp.watch(['./src/**/*.*'], ['webpack-app']);
})