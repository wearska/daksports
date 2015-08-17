'use strict';

var gulp = require('gulp');
var series = require('stream-series');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

module.exports = function(options) {
    gulp.task('styles', function() {

        var sassOptions = {
            style: 'expanded'
        };

        var variables = gulp.src([options.app + 'styles/partials/variables/**/*.scss'], {read: false});
        var base = gulp.src([options.app + 'styles/partials/base/**/*.scss'], {read: false});
        var layout = gulp.src([options.app + 'styles/partials/layout/**/*.scss'], {read: false});
        var animations = gulp.src([options.app + 'styles/partials/animations/**/*.scss'], {read: false});
        var components = gulp.src([options.app + 'styles/partials/components/**/*.scss'], {read: false});
        var modules = gulp.src([options.app + 'modules/**/*.scss'], {read: false});
        var views = gulp.src([options.app + 'views/**/*.scss'], {read: false});

        var injectOptions = {
            transform: function(filePath) {
                return '@import \'' + filePath + '\';';
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        };

        return gulp.src([
               options.app + 'styles/main.scss'
           ])
           .pipe($.inject(series(variables, base, layout, animations, components, modules, views), injectOptions))
           //.pipe(gulp.dest(options.app + 'styles'))
           .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
           .pipe($.autoprefixer({
               browsers: ['last 2 versions'],
               cascade: false
           })).on('error', options.errorHandler('Autoprefixer'))
           .pipe(gulp.dest(options.app + 'styles'))
           .pipe($.minifyCss())
           .pipe($.rename({
               suffix : '.min'
           }))
           .pipe(gulp.dest(options.app + 'styles'))
   });

    //     return gulp.src([
    //             options.app + 'styles/main.scss'
    //         ])
    //         .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
    //         .pipe($.autoprefixer({
    //             browsers: ['last 2 versions'],
    //             cascade: false
    //         })).on('error', options.errorHandler('Autoprefixer'))
    //         .pipe(gulp.dest(options.app + 'styles/'))
    //         .pipe($.size());
    // });
};
