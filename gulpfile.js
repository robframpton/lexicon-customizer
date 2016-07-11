'use strict';

const babel = require('gulp-babel');
const ejs = require('gulp-ejs');
const gulp = require('gulp');
const path = require('path');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

const pathBuild = 'build';

gulp.task('build', ['build:css', 'build:html', 'build:images', 'build:js', 'build:js:resources']);

gulp.task('build:lexicon', () => {
	return gulp.src(['node_modules/lexicon-ux/build/**/*', 'node_modules/lexicon-ux/src/**/*'], {
		base: 'node_modules/lexicon-ux'
	})
		.pipe(gulp.dest('lexicon'));
});

gulp.task('build:css', () => {
	return gulp.src('src/css/*')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(path.join(pathBuild, 'css')));
});

gulp.task('build:html', () => {
	return gulp.src('src/html/*.html')
		.pipe(gulp.dest(path.join(pathBuild, 'html')));
});

gulp.task('build:images', () => {
	return gulp.src('src/images/*')
		.pipe(gulp.dest(path.join(pathBuild, 'images')));
});

gulp.task('build:js', () => {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(babel())
		.pipe(gulp.dest(path.join(pathBuild, 'js')));
});

gulp.task('build:js:resources', () => {
	return gulp.src('src/js/**/*.!(js)')
		.pipe(gulp.dest(path.join(pathBuild, 'js')));
});

gulp.task('watch', () => {
	watch('src/css/**/*', vinyl => {
		gulp.start('build:css');
	});

	watch('src/(html|images)/**/*', vinyl => {
		gulp.start('build:html');
		gulp.start('build:images');
	});

	watch('src/js/**/*', vinyl => {
		gulp.start('build:js');
		gulp.start('build:js:resources');
	});
});
