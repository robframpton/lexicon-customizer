'use strict';

const babel = require('gulp-babel');
const del = require('del');
const download = require('gulp-download');
const ejs = require('gulp-ejs');
const gulp = require('gulp');
const zip = require('gulp-zip');
const install = require('gulp-install');
const path = require('path');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const spawn = require('cross-spawn').spawn;
const watch = require('gulp-watch');

const args = require('minimist')(process.argv.slice(2));
const runSequence = require('run-sequence').use(gulp);

const bumpUpdaterJSON = require('./scripts/bump_updater_json');

const PATH_APP = path.join(__dirname, 'app');

const PATH_BUILD = path.join(PATH_APP, 'build');

gulp.task('init', (cb) => {
	runSequence(
		'build',
		'install',
		cb
	);
});

gulp.task('build', (cb) => {
	runSequence(
		'build:clean',
		'build:css',
		'build:ejs',
		'build:html',
		'build:images',
		'build:js',
		'build:js:resources',
		cb
	);
});

gulp.task('install', (cb) => {
	let sequenceArray = [
		'install:app-dependencies',
		'install:sass-tarballs'
	];

	if (process.platform === 'win32') {
		sequenceArray = sequenceArray.concat([
			'install:node',
			'install:sass-bridge-dependencies',
			'install:zip-sass-bridge'
		]);
	}

	sequenceArray.push(cb);

	runSequence.apply(null, sequenceArray);
});

gulp.task('build:clean', () => {
	return del([path.join(PATH_BUILD, '**', '*')]);
});

gulp.task('build:css', () => {
	return gulp.src('app/src/css/*')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(path.join(PATH_BUILD, 'css')));
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
		.pipe(gulp.dest(path.join(PATH_BUILD, 'html/components')));
});

gulp.task('build:html', () => {
	return gulp.src('app/src/html/**/*.html')
		.pipe(gulp.dest(path.join(PATH_BUILD, 'html')));
});

gulp.task('build:images', () => {
	return gulp.src('app/src/images/**/*')
		.pipe(gulp.dest(path.join(PATH_BUILD, 'images')));
});

gulp.task('build:js', () => {
	return gulp.src('app/src/js/**/*.js')
		.pipe(plumber())
		.pipe(babel())
		.pipe(gulp.dest(path.join(PATH_BUILD, 'js')));
});

gulp.task('build:js:resources', () => {
	return gulp.src('app/src/js/**/*.!(js)')
		.pipe(gulp.dest(path.join(PATH_BUILD, 'js')));
});

gulp.task('install:app-dependencies', () => {
	return gulp.src([path.join(PATH_APP, 'bower.json'), path.join(PATH_APP, 'package.json')])
		.pipe(install());
});

gulp.task('install:node', function() {
	const nodeBinaryURL = 'https://nodejs.org/download/release/v6.1.0/win-x64/node.exe';

	return download(nodeBinaryURL)
		.pipe(gulp.dest('app/sass-bridge'));
});

gulp.task('install:sass-bridge-dependencies', () => {
	gulp.src(path.join(PATH_APP, 'sass-bridge/package.json'))
		.pipe(install());
});

gulp.task('install:zip-sass-bridge', () => {
	return gulp.src(path.join(PATH_APP, 'sass-bridge/**/*'))
		.pipe(zip('sass-bridge.zip'))
		.pipe(gulp.dest('app/tarballs'));
});

gulp.task('install:sass-tarballs', () => {
	const lexiconPkg = require(path.join(__dirname, 'app/node_modules/lexicon-ux/package.json'));

	const resources = [
		'https://registry.npmjs.org/bourbon/-/bourbon-4.2.7.tgz',
		'https://registry.npmjs.org/lexicon-ux/-/lexicon-ux-' + lexiconPkg.version + '.tgz'
	];

	return download(resources)
		.pipe(gulp.dest('app/tarballs'));
});

gulp.task('version', (cb) => {
	let type = 'patch';

	if (args.minor) {
		type = 'minor';
	}
	else if (args.major) {
		type = 'major';
	}

	spawn('npm', ['version', type], {
		cwd: PATH_APP
	}).on('close', () => {
		bumpUpdaterJSON();

		cb();
	});
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
