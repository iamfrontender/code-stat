require('harmonize')();

var $ = require('requirist')(
    'fs',
    'path',

    'gulp',
    'gulp-util as gutil',
    'gulp-jade as jade',
    'gulp-concat as concat',
    'gulp-less as less',
    'esprima',
    'webpack',

    './utils/*.js'
);

$.gulp.task('diagram', function(done) {
    $.readFile('evrythng')
        .then($.parse)
        .then($.diagram)
        .then($.render)
        .then(done)
        .catch($.error)
});

$.gulp.task('scripts', function(done) {
    $.webpack({
        entry: './src/main.js',
        output: {
            path: $.path.join(__dirname, 'dist'),
            filename: 'app.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel'
                }
            ]
        }
    }, function(err, stats) {
        if (err) throw new $.gutil.PluginError('webpack', err);

        $.gutil.log('[webpack]', stats.toString());
        done();
    });
});

$.gulp.task('styles', function() {
    $.gulp.src('./src/*.less')
        .pipe($.less())
        .pipe($.concat('main.css'))
        .pipe($.gulp.dest('./dist/'));
});

$.gulp.task('layouts', function() {
    $.gulp.src('./src/*.jade')
        .pipe($.jade())
        .pipe($.gulp.dest('./dist/'));
});

$.gulp.task('watch', function(done) {
    $.gulp.watch('./src/**/*.js', ['scripts']);
    $.gulp.watch('./src/*.jade', ['layouts']);
    $.gulp.watch('./src/*.less', ['styles']);
});

$.gulp.task('default', ['scripts', 'layouts', 'styles', 'diagram', 'watch']);