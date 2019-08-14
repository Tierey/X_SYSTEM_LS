'use strict'

class Paths {
    constructor(){
        let _ = this;
        _.cwd = `${process.cwd().replace(/\\/gim,"/")}`
            _.css  = `${_.cwd}/css`
            _.html = `${_.cwd}/html`
            _.img  = `${_.cwd}/img`
            _.js   = `${_.cwd}/js`
            _.www  = `${_.cwd}/www`
        }
}

const paths       = new Paths
const gulp        = require('gulp')
const browserSync = require('browser-sync').create()
const stylus      = require('gulp-stylus')
const plumber     = require('gulp-plumber')
const del         = require(`del`)


gulp.task('clear',cb=>{
    del.sync([`${paths.www}/**/*.*`])
    cb()
})


gulp.task('html', cb =>
    gulp.src([`${paths.html}/*.html`])
    .pipe( gulp.dest(`${paths.www}`))
    .pipe( browserSync.stream())
);


gulp.task('css', cb => 
    gulp.src([`${paths.css}/main.styl`]) 
    .pipe( plumber())
    .pipe( stylus({'include css': true}))
    .pipe( gulp.dest(`${paths.www}/css`))
    .pipe( browserSync.stream())
);


gulp.task('js', cb => 
    gulp.src([`${paths.js}/main.js`])
    .pipe( gulp.dest(`${paths.www}/js`))
    .pipe( browserSync.stream())
);


gulp.task('img', cb => 
    gulp.src([`${paths.img}/**/*.{css,png,jpg,jpeg}`])
    .pipe( gulp.dest(`${paths.www}/img`))
    .pipe( browserSync.stream())
);


gulp.task('browser-sync',()=>{
    browserSync.init({
        server : {
            baseDir   : paths.www,
            directory : true,
        },          
        notify : false,
        open   : false,
    });
});


gulp.task('watch',()=> {
    gulp.watch([`${paths.html}/**/*.html`]  , gulp.series('html'))
    gulp.watch([`${paths.css}/**/*.styl`]   , gulp.series('css' ))
    gulp.watch([`${paths.js}/**/*.js`]      , gulp.series('js'  ))
    gulp.watch([`${paths.img}/**/*.*`]      , gulp.series('img' ))
    gulp.watch([`${paths.cwd}/gulpfile.js`] , cb => cb(process.exit(0)))
});


gulp.task('default',gulp.series( 'clear' , gulp.parallel('css','html','js','img','browser-sync','watch')))