'use strict';

const babel = require('gulp-babel');
const del = require('del');
const download = require('gulp-download');
const ejs = require('gulp-ejs');
const gulp = require('gulp');
const path = require('path');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

const runSequence = require('run-sequence').use(gulp);

const pathBuild = 'app/build';

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
		'cache-tarballs',
		cb
	);
});

gulp.task('build:clean', () => {
	return del([path.join(pathBuild, '**', '*')]);
});

gulp.task('build:css', () => {
	return gulp.src('app/src/css/*')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(path.join(pathBuild, 'css')));
});

gulp.task('build:html', () => {
	return gulp.src('app/src/html/**/*.html')
		.pipe(gulp.dest(path.join(pathBuild, 'html')));
});

gulp.task('build:images', () => {
	return gulp.src('app/src/images/**/*')
		.pipe(gulp.dest(path.join(pathBuild, 'images')));
});

gulp.task('build:js', () => {
	return gulp.src('app/src/js/**/*.js')
		.pipe(plumber())
		.pipe(babel())
		.pipe(gulp.dest(path.join(pathBuild, 'js')));
});

gulp.task('build:ejs', () => {
	const relativeRootPath = '../../../';

	const lexiconPath = relativeRootPath + 'node_modules/lexicon-ux/build/';

	gulp.src('app/src/html/templates/components/*.ejs')
		.pipe(ejs({
			scripts: [
				'${appPath}/bower_components/jquery/dist/jquery.js',
				'${lexiconPath}/js/bootstrap.js',
				'${lexiconPath}/js/svg4everybody.js'
			]
		}))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest(path.join(pathBuild, 'html/components')));
});

gulp.task('build:js:resources', () => {
	return gulp.src('app/src/js/**/*.!(js)')
		.pipe(gulp.dest(path.join(pathBuild, 'js')));
});

gulp.task('cache-tarballs', () => {
	const lexiconPkg = require(path.join(require.resolve('lexicon-ux'), '..', 'package.json'));

	const resources = [
		'https://registry.npmjs.org/bourbon/-/bourbon-4.2.7.tgz',
		'https://registry.npmjs.org/lexicon-ux/-/lexicon-ux-' + lexiconPkg.version + '.tgz'
	];

	return download(resources)
		.pipe(gulp.dest('app/tarballs'));
});

gulp.task('setup-win-sass', () => {
	const nodeBinaryURL = 'https://nodejs.org/download/release/v6.1.0/win-x64/node.exe';

	return download(nodeBinaryURL)
		.pipe(gulp.dest('app/sass-bridge'));
});

gulp.task('watch', () => {
	watch('app/src/css/**/*', vinyl => {
		gulp.start('build:css');
	});

	watch('app/src/(html|images)/**/*', vinyl => {
		gulp.start('build:html');
		gulp.start('build:images');
	});

	watch('app/src/js/**/*', vinyl => {
		gulp.start('build:js');
		gulp.start('build:js:resources');
	});
});
