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
            options.app + 'styles/**/*.scss'
        ], function(event) {
            if (isOnlyChange(event)) {
                gulp.start('styles');
            } else {
                gulp.start('inject');
            }
        });

        gulp.watch(options.app + 'scripts/**/*.js', function(event) {
            if (!isOnlyChange(event)) {
                gulp.start('inject');
            }
        });
    });

};
