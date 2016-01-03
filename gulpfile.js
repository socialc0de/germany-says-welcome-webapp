var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

gulp.task('deps_handlebars', function () {
    gulp.src(['bower_components/handlebars/handlebars.amd.js'])
        .pipe(rename("handlebars.js"))
        .pipe(gulp.dest('js/third-party'));
});

gulp.task('deps_hoverboard', function () {
    gulp.src(['bower_components/hoverboard-flux/dist/hoverboard.js'])
        .pipe(gulp.dest('js/third-party'));
});

gulp.task('deps_html2hscript', function () {
    return browserify({
        entries: ['node_modules/html2hscript/index.js'],
        standalone: 'html2hscript'
    })
        .bundle()
        .pipe(source('html2hscript.js'))
        .pipe(gulp.dest("js/third-party"));
});

gulp.task('deps_i18next', function () {
    gulp.src([
        'bower_components/i18next/i18next.js'])
        .pipe(rename('i18next.js'))
        .pipe(gulp.dest('js/third-party'));
});

gulp.task('deps_jquery', function () {
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/FitText.js/jquery.fittext.js',
        'bower_components/jquery-easing/jquery.easing.js'
    ]).pipe(gulp.dest('js/third-party'));
});

gulp.task('deps_jscookie', function () {
    gulp.src(['bower_components/js-cookie/src/js.cookie.js'])
        .pipe(gulp.dest('js/third-party'));
});

gulp.task('deps_materialize', function () {
    gulp.src(['bower_components/Materialize/dist/js/materialize.js',
        'bower_components/hammerjs/hammer.js'])
        .pipe(gulp.dest('js/third-party'));
    gulp.src(['bower_components/Materialize/dist/font/**/*'])
        .pipe(gulp.dest('css/third-party/materialize/font'));
    /*    gulp.src(['bower_components/Materialize/dist/css/materialize.css'])
     .pipe(gulp.dest('css/third-party/materialize/css'));*/
    gulp.src(['bower_components/Materialize/sass/**/*'])
        .pipe(gulp.dest('scss/third-party/materialize'));

});

gulp.task('deps_requirejs', function () {
    gulp.src([
        'bower_components/requirejs/require.js'
    ]).pipe(gulp.dest('js/third-party'));
    gulp.src([
        'bower_components/requirejs-domready/domReady.js'
    ])
        .pipe(rename('requirejs-domready.js'))
        .pipe(gulp.dest('js/third-party'));
});

gulp.task('deps_vdom', function () {
    gulp.src([
        'bower_components/virtual-dom/dist/virtual-dom.js'
    ]).pipe(gulp.dest('js/third-party'));
});

gulp.task('deps_underscore', function () {
    gulp.src([
        'bower_components/underscore/underscore.js'
    ]).pipe(gulp.dest('js/third-party'));
});

gulp.task('deps_leaflet', function () {
    gulp.src([
        'bower_components/leaflet/dist/leaflet.js',
        'bower_components/leaflet.markercluster/dist/leaflet.markercluster.js'
    ]).pipe(gulp.dest('js/third-party'));
    gulp.src(['bower_components/leaflet/dist/images/*'])
        .pipe(gulp.dest('css/third-party/leaflet/images'));
    gulp.src([
        'bower_components/leaflet/dist/leaflet.css',
        'bower_components/leaflet.markercluster/dist/MarkerCluster.css',
        'bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css'
    ]).pipe(gulp.dest('scss/third-party/leaflet'));
});

gulp.task('deps', [
    'deps_i18next',
    'deps_handlebars',
    'deps_html2hscript',
    'deps_hoverboard',
    'deps_jquery',
    'deps_jscookie',
    'deps_materialize',
    'deps_requirejs',
    'deps_underscore',
    'deps_vdom',
    'deps_leaflet'
], function () {
});

gulp.task('sass', function () {
    gulp.src('scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('install', ['deps', 'sass'], function () {

});

gulp.task('default',function() {
    gulp.watch('scss/*.scss',['sass']);
});
