'use strict'
var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    cleanCss = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglyfly = require('gulp-uglyfly'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    gcmq = require('gulp-group-css-media-queries'),
    browserSync = require('browser-sync'),
    cachebust = require('gulp-cache-bust'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    htmlImport = require('gulp-html-import'),
    webp = require('gulp-webp'),
    reload = browserSync.reload;

let deployJSON = null;
try {
    deployJSON = require('./deploy.json');
} catch {
    console.log('Deploy file is missing.');
}

gulp.task('clean', function(done) {
    done();
    return del.sync('build');
});

gulp.task('corr', function(done) {
    done();
    return del.sync(['build/components']);
});
//CSS
gulp.task('buildSass', function() {
    return gulp.src(['./src/sass/*.scss', '!./src/sass/root.scss', '!./src/sass/keyframes.scss', '!./src/sass/mixins.scss'])
        .pipe(sass({ errLogToConsole: true }))
        .pipe(gcmq())
        .pipe(plumber())
        // .pipe(concatCss('main.css'))
        .pipe(gulp.dest('src/css'));
});
gulp.task('buildCss', gulp.series('buildSass', function() {
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer())
        // .pipe(concatCss('css/main.css'))
        .pipe(cleanCss({
            compatibility: 'ie8',
            level: 2
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(reload({ stream: true }))
}));
gulp.task('sass:watch', function() {
    return gulp.watch('src/sass/*.scss', ['sass']);
});
//CSS
//JS
gulp.task('buildJs', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('js/scripts.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglyfly())
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream: true }));
});
//JS
//vendors
gulp.task('vendors', function() {
    return gulp.src('src/vendors/**')
        .pipe(gulp.dest('build/vendors'))
        .pipe(reload({ stream: true }));
});
//vendors
//HTML
gulp.task('buildHtml', function() {
    return gulp.src('src/*.html')
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(htmlImport('./src/components/'))
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream: true }));
});
//HTML
//img
gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('build/img'))
        .pipe(reload({ stream: true }));
});
//img
//images optimization
gulp.task('imgmin', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeDimensions: true },
                    { removeAttrs: true },
                    { removeElementsByAttr: true },
                    { removeStyleElement: true },
                    { removeViewBox: false }
                ]
            })
        ]))
        .pipe(gulp.dest('build/img'))
        .pipe(reload({ stream: true }));
});
//images optimization
//fonts
gulp.task('buildFonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('build/fonts'))
        .pipe(reload({ stream: true }));
});
//fonts
// deploy
gulp.task('deploy', function() {
    if (deployJSON && deployJSON.host) {
        let url = deployJSON.host.includes('//') ? deployJSON.host.slice(deployJSON.host.indexOf('//') + 2) :
            deployJSON.host;
        let connConfig = {
            host: url || null,
            user: deployJSON.user || null,
            password: deployJSON.password || null,
            parallel: 10,
            log: gutil.log
        }

        let conn = ftp.create(connConfig)
        let globs = [
            'build/**'
        ];

        return gulp.src(globs, { buffer: false })
            .pipe(conn.dest(`${url}/public_html`));
    } else {
        console.log('DEPLOY IS NOT COMPLETE');
        return Promise.resolve();
    }
});
gulp.task('deployAll', function() {
    if (deployJSON && deployJSON.host) {
        let url = deployJSON.host.includes('//') ? deployJSON.host.slice(deployJSON.host.indexOf('//') + 2) :
            deployJSON.host;
        let connConfig = {
            host: url || null,
            user: deployJSON.user || null,
            password: deployJSON.password || null,
            parallel: 10,
            log: gutil.log
        }

        let conn = ftp.create(connConfig)
        let CSSglob = ['build/css/**/*'];
        let JSglob = ['build/js/**/*'];
        let vendorsGlob = ['build/vendors/**/*'];

        const css = () => {
            return gulp.src(CSSglob, { buffer: false })
                .pipe(conn.dest(`/assets/templates/css`))
        };

        const js = () => {
            return gulp.src(JSglob, { buffer: false })
                .pipe(conn.dest(`/assets/templates/js`))
        };

        const vendors = () => {
            return gulp.src(vendorsGlob, { buffer: false })
                .pipe(conn.dest(`/assets/templates/vendors`))
        }

        css();
        js();
        vendors();
        return Promise.resolve();

    } else {
        console.log('DEPLOY ALL IS NOT COMPLETE');
        return Promise.resolve();
    }
});

//to webp convert
gulp.task('webp', function() {
    return gulp.src(['src/img/**/*', '!src/img/icons/*'])
        .pipe(webp())
        .pipe(gulp.dest('build/img'))
});

// dest
gulp.task('dest', function() {
    return gulp.src(['./src/*', '!./src/sass/', '!./src/components',
            '!./src/css',
            '!./src/js',
            '!./src/img',
            '!./src/vendors',
            '!./src/*.html'
        ])
        .pipe(gulp.dest('build/'))
        .pipe(reload({ stream: true }));
});
// end dest
//dev build
gulp.task('devbuild', gulp.series(
    'buildHtml',
    'buildCss',
    'buildJs',
    'img',
    'buildFonts',
    'vendors',
    'dest',
    'webp',
    'corr',
));
//dev build
//production build
gulp.task('build', gulp.series(
    'buildHtml',
    'buildCss',
    'buildJs',
    'buildFonts',
    'imgmin',
    'vendors',
    'dest',
    'webp',
    // 'deploy',
));
//production build
//webserver

gulp.task('modxWebserver', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        port: 8080,
        open: false,
        notify: false
    });
    gulp.watch(['src/*.html', 'src/components/*'], gulp.series('buildHtml'));
    gulp.watch('src/sass/*.scss', gulp.series('buildCss', 'deployAll'));
    gulp.watch('src/js/*.js', gulp.series('buildJs', 'deployAll'));
    gulp.watch('src/fonts/*', gulp.series('buildFonts'));
    gulp.watch('src/img/**/*', gulp.series('img', 'webp'));
    gulp.watch('src/vendors/**', gulp.series('vendors', 'deployAll'));
    gulp.watch(['./src/*', '!./src/sass/*', '!./src/components/*',
        '!./src/css/*',
        '!./src/js/*',
        '!./src/img/*',
        '!./src/vendors/*',
        '!./src/*.html'
    ], gulp.series('dest'));
});

gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        port: 8080,
        open: true,
        notify: false
    });
    gulp.watch(['src/*.html', 'src/components/*'], gulp.series('buildHtml'));
    gulp.watch('src/sass/*.scss', gulp.series('buildCss'));
    gulp.watch('src/js/*.js', gulp.series('buildJs'));
    gulp.watch('src/fonts/*', gulp.series('buildFonts'));
    gulp.watch('src/img/**/*', gulp.series('img', 'webp'));
    gulp.watch('src/vendors/**', gulp.series('vendors'));
    gulp.watch(['./src/*', '!./src/sass/*', '!./src/components/*',
        '!./src/css/*',
        '!./src/js/*',
        '!./src/img/*',
        '!./src/vendors/*',
        '!./src/*.html'
    ], gulp.series('dest'));
});

//dev compile
gulp.task('default', gulp.series(
    'devbuild',
    'webserver'
));

//modx
gulp.task('modx', gulp.series(
    'devbuild',
    'deployAll',
    'modxWebserver'
));

//prod compile
gulp.task('prod', gulp.series(
    'clean',
    'build'
));