'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function (options) {

    gulp.task('inject',['styles'], function () {
        var injectStyles = gulp.src([
          options.app + 'styles/main.min.css'
        ], {
            read: false
        });

        var injectScripts = gulp.src([
            options.app + 'scripts/**/*.js',
            options.app + 'scripts/app.js',
            options.app + 'scripts/main.js',
        ], {
            read: false,
        });

        var injectOptions = {
            addRootSlash: false
        };

        return gulp.src(options.app + 'index.html')
            .pipe($.inject(injectStyles, injectOptions))
            .pipe($.inject(injectScripts, injectOptions))
            .pipe(wiredep(options.wiredep))
            .pipe(gulp.dest(options.app));
    });
};
