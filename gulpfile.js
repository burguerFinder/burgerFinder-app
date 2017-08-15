var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


var rutas = {
	rutaJS: './src/js/*.js',
	rutaCSS: './src/scss/*.scss',
	rutaHTML:'src/*.html',
	rutaViews: 'src/views/*.html'

};

gulp.task('html', function(){
	gulp.src(rutas.rutaHTML)
		.pipe(gulp.dest('./public/'))
});
gulp.task('views', function(){
	gulp.src(rutas.rutaViews)
		.pipe(gulp.dest('./public/views/'))
});
gulp.task('js', function(){
	gulp.src(rutas.rutaJS)
		.pipe(gulp.dest('./public/js/'))
});

gulp.task('css', function(){
	gulp.src(rutas.rutaCSS)
		.pipe(sass({
		outputStyle:'compressed',
		precision: 3
	}).on('error', sass.logError))
		.pipe(gulp.dest('./public/css/'))
});
gulp.task('cambios', function(){
	browserSync.init({
		server:{
			baseDir:'./public'
		}
	});
	gulp.watch(rutas.rutaCSS, ['css']);
    gulp.watch(rutas.rutaHTML, ['html']);
    gulp.watch(rutas.rutaJS, ['js']);
    gulp.watch(rutas.rutaJS, ['views']);
});
gulp.task('done', ['css', "js", "html", 'views'], function(){
	browserSync.reload();
});