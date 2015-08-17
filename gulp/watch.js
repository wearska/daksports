'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

function isOnlyChange(event) {
    return event.type === 'changed';
}

module.exports = function(options) {

    gulp.task('watch', ['inject'], function() {

        gulp.watch([options.app + '/*.html', 'bower.json'], ['inject']);

        gulp.watch([
            options.app + 'styles/**/**/*.scss',
            options.app + 'styles/**/*.scss',
            options.app + 'modules/**/**/*.scss',
            options.app + 'modules/**/*.scss',
            options.app + 'views/**/*.scss'
        ], function(event) {
            if (isOnlyChange(event)) {
                gulp.start('styles');
            } else {
                gulp.start('inject');
            }
        });

        gulp.watch([
            options.app + 'scripts/**/*.js',
            options.app + 'scripts/**/**/*.js',
            options.app + 'modules/**/*.js',
            options.app + 'modules/**/**/*.js',
            options.app + 'views/**/*.js'
        ], function(event) {
            if (!isOnlyChange(event)) {
                gulp.start('inject');
            }
        });
    });

};
