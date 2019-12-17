const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat');
const flatten = require('gulp-flatten');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

// const uglifycss = require('gulp-uglifycss');

const gulpConfig = {
    paths: {
        scss: `${__dirname}/development/scss/**/*.scss`,
        scssDest: `${__dirname}/app/assets/css`,
        js: `${__dirname}/development/scripts/**/*.js`,
        jsDest: `${__dirname}/app/assets/scripts`,
        nunjucks: `${__dirname}/app/views/**/*.njk`,
        govImages: [`${__dirname}/node_modules/govuk_template_jinja/assets/images/**.*{png,ico}`],
        govImagesDest: `${__dirname}/app/assets/images`,
        govScripts: `${__dirname}/node_modules/govuk_template_jinja/assets/javascripts/**/*.js`,
        govScriptsDest: `${__dirname}/app/assets/scripts`,
        // Also takes the fonts and images folders as they are referenced within the gov.uk toolkit TODO seperate so css files can be minified TODO check if ie8 used in contact centres / jobcentres
        govCss: [`${__dirname}/node_modules/govuk_template_jinja/assets/stylesheets/{fonts-ie8,fonts,govuk-template-ie8,govuk-template-print,govuk-template}.css`, `${__dirname}/node_modules/govuk_template_jinja/assets/stylesheets/**/*.png`, `${__dirname}/node_modules/govuk_template_jinja/assets/stylesheets/**/*.eot`],
        govCssDest: `${__dirname}/app/assets/css`
    }
};

// Copy images from govuk node_modules
gulp.task('copygovImages', () => {
    return gulp.src(gulpConfig.paths.govImages)
    .pipe(gulp.dest(gulpConfig.paths.govImagesDest));
});

// Copy and minify scripts from govuk node_modules
gulp.task('copygovScripts', (cb) => {
    pump([
    gulp.src(gulpConfig.paths.govScripts),
    uglify(),
    gulp.dest(gulpConfig.paths.govScriptsDest)
      ],
      cb
);
});

// Copy css from govuk node_modules
gulp.task('copygovStyles', () => {
    return gulp.src(gulpConfig.paths.govCss)
    .pipe(gulp.dest(gulpConfig.paths.govCssDest));
});

// minifies and compiles sass files from development to app (main.scss imports sass files from govuk node_modules)
gulp.task('sass', () => {
    try {
        return gulp.src(gulpConfig.paths.scss)
        .pipe(sass({outputStyle: 'compressed',
            includePaths: ['node_modules/govuk_frontend_toolkit/stylesheets',
            'node_modules/govuk_template_jinja/assets/stylesheets',
            'node_modules/govuk-elements-sass/public/sass']}).on('error', sass.logError))
            .pipe(gulp.dest(gulpConfig.paths.scssDest))
            .pipe(browserSync.reload({
            stream: true
            }));
    }
    catch(error) {
        console.log(error);
    }
});

gulp.task('sassBuild', () => {
    return gulp.src(gulpConfig.paths.scss)
    .pipe(sass({outputStyle: 'compressed',
        includePaths: ['node_modules/govuk_frontend_toolkit/stylesheets',
        'node_modules/govuk_template_jinja/assets/stylesheets',
        'node_modules/govuk-elements-sass/public/sass']}).on('error', sass.logError))
        .pipe(gulp.dest(gulpConfig.paths.scssDest));
});

// minifies main.js
gulp.task('uglyjsBuild', (cb) => {
  pump([
    gulp.src(gulpConfig.paths.js),
    uglify(),
    gulp.dest(gulpConfig.paths.jsDest)
  ],
  cb
);
});

gulp.task('uglyjs', (cb) => {
    return gulp.src(gulpConfig.paths.js)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(gulpConfig.paths.jsDest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// refreshes on njk file change
gulp.task('nunjucks', () => {
    browserSync.reload();
});

// watch all scss and js files, run required tasks, refresh browser
gulp.task('watch', ['sass'], () =>{
  gulp.watch(gulpConfig.paths.scss, {interval: 1000, mode: 'poll'}, ['sass']);
  gulp.watch(gulpConfig.paths.js, {interval: 1000, mode: 'poll'}, ['uglyjs']);
  gulp.watch(gulpConfig.paths.nunjucks, {interval: 1000, mode: 'poll'}, ['nunjucks']);
});

gulp.task('browserSync', () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 3001,
    reloadDelay: 1000,
    ghostMode: {
    clicks: false,
    forms: false,
    scroll: false
},
    https: {
    key: './development/certs/room-booking-server.key',
    cert: './development/certs/room-booking-server.crt'
    },
    open: false
  });
});

gulp.task('server', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
  }).on('quit', function() {
    process.exit(0);
  });
});

gulp.task('default', (done) => {
  runSequence('copygovStyles', 'copygovImages', 'copygovScripts', 'watch', 'sass', 'uglyjs', 'server', 'browserSync', done);
});

gulp.task('noserver', (done) => {
  runSequence('copygovStyles', 'copygovImages', 'copygovScripts', 'watch', 'sass', 'uglyjs', 'browserSync', done);
});

gulp.task('nosass', (done) => {
  runSequence('copygovStyles', 'copygovImages', 'copygovScripts', 'uglyjs', 'server', 'browserSync', done);
});



gulp.task('build', (done) => {
  runSequence('copygovStyles', 'copygovImages', 'copygovScripts', 'uglyjsBuild', 'sassBuild', done);
});
