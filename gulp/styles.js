'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

module.exports = function(options) {
    gulp.task('styles', function() {

        var sassOptions = {
            style: 'expanded'
        };


        return gulp.src([
                options.app + 'styles/main.scss'
            ])
            .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
            .pipe($.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })).on('error', options.errorHandler('Autoprefixer'))
            .pipe(gulp.dest(options.app + 'styles/'))
            .pipe($.size());
    });
};
