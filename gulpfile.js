'use strict';

const babel = require('gulp-babel');
const del = require('del');
const ejs = require('gulp-ejs');
const gulp = require('gulp');
const path = require('path');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

const runSequence = require('run-sequence').use(gulp);

const pathBuild = 'build';

gulp.task('build', (cb) => {
	runSequence(
		'build:clean',
		'build:css',
		'build:html',
		'build:ejs',
		'build:images',
		'build:js',
		'build:js:resources',
		'build:ejs',
		cb
	);
});

gulp.task('build:clean', () => {
	return del([path.join(pathBuild, '**', '*')]);
});

gulp.task('build:css', () => {
	return gulp.src('src/css/*')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(path.join(pathBuild, 'css')));
});

gulp.task('build:html', () => {
	return gulp.src('src/html/**/*.html')
		.pipe(gulp.dest(path.join(pathBuild, 'html')));
});

gulp.task('build:images', () => {
	return gulp.src('src/images/**/*')
		.pipe(gulp.dest(path.join(pathBuild, 'images')));
});

gulp.task('build:js', () => {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(babel())
		.pipe(gulp.dest(path.join(pathBuild, 'js')));
});

gulp.task('build:ejs', () => {
	const relativeRootPath = '../../../';

	const lexiconPath = relativeRootPath + 'node_modules/lexicon-ux/build/';

	gulp.src('src/html/templates/components/*.ejs')
		.pipe(ejs({
			iconSpritePath: lexiconPath + 'images/icons/icons.svg',
			imagesPath: '../../images',
			lexiconImagesPath: lexiconPath + 'images',
			scripts: [
				relativeRootPath + 'bower_components/jquery/dist/jquery.js',
				lexiconPath + 'js/bootstrap.js',
				lexiconPath + 'js/svg4everybody.js'
			]
		}))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest(path.join(pathBuild, 'html/components')));
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
