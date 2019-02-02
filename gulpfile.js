'use strict';
/* ncu [ -a / ncu -p bower ]
 * npm [ update / i ]
 * taskhost.exe висячий START в диспетчере задач
 * new_component -n name
 */
let cl = console.log
// GULP X NODE \\
const gulp        = require('gulp');                   // 4ая альфа версия
const browserSync = require('browser-sync').create();  // перезагрузка браузера
const stylus      = require('gulp-stylus');            // http://stylus-lang.com/try.html#
const plumber     = require('gulp-plumber');      // добавляет префикси браузеров для css
const t2          = require(`through2`).obj;
const File        = require(`vinyl`);
const path        = require(`path`);
// BASE \\
{

    gulp.task('html',()=> {
        return gulp.src([`./index.html`])
        .pipe( gulp.dest(`./public`))
        .pipe( browserSync.stream())
    });
    
    
    gulp.task('styl',()=> { 
        return gulp.src([`./main.styl`]) // берет основной фаил стилей
        .pipe( plumber())
        .pipe( stylus({'include css': true,}))// производить все импорты создавая только один фаил в конце
        .pipe( gulp.dest(`./public`))
        .pipe( browserSync.stream())
    });

    gulp.task('js',()=> {
        return gulp.src([`./main.js`])
        .pipe( gulp.dest(`./public`))
        .pipe( browserSync.stream())
    });

    gulp.task('browser-sync',()=>{
        browserSync.init({
            server: {
                baseDir: `./public`,
                directory: true,
            },          
            notify: false,
            open: false,
            cache: false
        });
        browserSync.emitter.on('service:running', function() {
            browserSync.sockets.on('connection', function(socket) {
                socket.on('click', function(e) {
                    if(e.id){
                        if(e.id == 'btn'){
                            console.log(e)
                        }
                    }
                });
            });
        });
        
    });

    gulp.task('watch',()=> {
        gulp.watch([`./index.html`], gulp.series('html'));
        gulp.watch([`./*.styl`],  gulp.series('styl'));
        gulp.watch([`./main.js`],    gulp.series('js'));
    });

    gulp.task('default',gulp.parallel('styl','html',"js",'browser-sync','watch'));
    gulp.task('build'  ,gulp.series(gulp.parallel('styl','html',"js"),function(cb){
    
        cb()
    }));
}
