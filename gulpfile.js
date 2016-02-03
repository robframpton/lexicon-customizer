const babel = require('gulp-babel');
const ejs = require('gulp-ejs');
const gulp = require('gulp');
const path = require('path');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

const pathBuild = 'build/public';

gulp.task('build', ['build:css', 'build:html', 'build:images', 'build:js']);

gulp.task('build:css', () => {
	return gulp.src('src/public/css/*')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(path.join(pathBuild, 'css')));
});

gulp.task('build:html', () => {
	return gulp.src('src/public/html/*.html')
		// .pipe(ejs({

		// }))
		// .pipe(rename({
		// 	extname: 'html'
		// }))
		.pipe(gulp.dest(path.join(pathBuild, 'html')));
});

gulp.task('build:images', () => {
	return gulp.src('src/public/images/*')
		.pipe(gulp.dest(path.join(pathBuild, 'images')));
});

gulp.task('build:js', () => {
	return gulp.src('src/public/js/*.js')
		.pipe(plumber())
		.pipe(babel({
			plugins: ['transform-react-jsx'],
			presets: ['es2015']
		}))
		.pipe(gulp.dest(path.join(pathBuild, 'js')));
});

gulp.task('watch', () => {
	watch('src/**/*', vinyl => {
		var dirname = path.basename(path.dirname(vinyl.path));

		gulp.start(`build:${dirname}`);
	});
});
