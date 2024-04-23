const projectFolder = 'build';
const sourceFolder = 'src';
const path = {
    build: {html: projectFolder + '/', css: projectFolder + '/css/', js: projectFolder + '/js/', img: projectFolder + '/img/'},
    src: {
        html: sourceFolder + '/pug/*.pug',
        css: sourceFolder + '/scss/style.scss',
        js: sourceFolder + '/js/script.js',
        img: sourceFolder + '/img/*'
    },
    watch: {
        html: sourceFolder + '/pug/**/*.pug',
        css: sourceFolder + '/scss/**/*.scss',
        js: sourceFolder + '/js/**/*.js',
        img: sourceFolder + '/img/*'
    },
    clean: './' + projectFolder + '/'
}

const {src, dest} = require('gulp'), gulp = require('gulp'), browsersync = require('browser-sync').create(),
    del = require('del'),
    scss = require("gulp-sass")(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    groupMedia = require('gulp-group-css-media-queries'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    pug = require('gulp-pug');

function browserSync() {
    browsersync.init({server: {baseDir: './' + projectFolder + '/'}, port: 3000, notify: false})
}

function html() {
    return src(path.src.html).pipe(pug({pretty: true})).pipe(rename({dirname: ""})).pipe(dest(path.build.html)).pipe(browsersync.stream())
}

function css() {
    return src(path.src.css).pipe(scss({outputStyle: 'expanded'})).pipe(groupMedia()).pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: true
    })).pipe(rename({dirname: ""})).pipe(dest(path.build.css)).pipe(cleanCss()).pipe(rename({extname: '.min.css'})).pipe(rename({dirname: ""})).pipe(dest(path.build.css)).pipe(browsersync.stream())
}

function js() {
    return src(path.src.js).pipe(rename({dirname: ""})).pipe(dest(path.build.js)).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(rename({dirname: ""})).pipe(dest(path.build.js)).pipe(browsersync.stream())
}

function img() {
    return src(path.src.img).pipe(rename({dirname: ""})).pipe(dest(path.build.img)).pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], img);
}

function clean() {
    return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(js, css, html, img));
const watch = gulp.parallel(build, watchFiles, browserSync);
exports.js = js;
exports.css = css;
exports.html = html;
exports.img = img;
exports.build = build;
exports.watch = watch;
exports.default = watch;