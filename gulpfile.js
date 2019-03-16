var gulp = require('gulp');
	sass = require('gulp-sass');
	autoprefixer = require('gulp-autoprefixer');
	concat = require('gulp-concat');
	cssnano = require('gulp-cssnano');
	rename = require('gulp-rename');
	compass = require('gulp-compass');
	clean = require('gulp-clean');
	notify = require('gulp-notify');
	plumber = require('gulp-plumber');
	sourcemaps = require('gulp-sourcemaps');
	uglify = require('gulp-uglify');
	wiredep = require('gulp-wiredep');
	useref = require('gulp-useref');
	browserSync = require('browser-sync').create();

// Задача с названием 'default' запускается автоматически по команде 'gulp' в консоле.
// Эта конструкция работает синхронно, сначала выполняется задача 'clean' и только после ее завершнения запускается 'dev'.
gulp.task('default', ['clean'], function() {
	gulp.run('dev');
});
// Аналогично с предыдушей задачей.
// Выполняет задача 'clean' и после ее завершения запускается 'build'.
gulp.task('production', ['clean'], function() {
	gulp.run('build');
});
// Задача 'dev' представляется собой сборку в режиме разработки.
// Запускает build - сборку, watcher - слежку за файлами и browser-sync.
gulp.task('dev', ['build', 'watch', 'browser-sync']);
// Задача 'build' представляет собой сборку в режиме продакшен.
// Собирает проект.
gulp.task('build', ['html', 'styles', 'scripts', 'assets']);
// Задача 'watch' следит за всеми нашими файлами в проекте и при изменении тех или иных перезапустает соответсвующую задачу.
gulp.task('watch', function() {
	gulp.watch('app/css/**/*.scss', ['styles']); //стили
    gulp.watch('app/js/**/*.js', ['scripts']); //скрипты
    gulp.watch(['../bower.json', 'app/index.html'], ['html']); // html
    gulp.watch('./app/assets/**/*.*', ['assets']); //наши локальные файлы(картинки, шрифты)
    gulp.watch('app/**/*.*').on('change', browserSync.reload); //Перезапуск browserSynс
});
gulp.task('styles', function() {
	gulp.src('./app/css/{adaptive,misc,section}/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Styles',
					message: err.message
				}
			})
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		})) 
		.pipe(concat('styles.css'))
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(rename('build.css')) //Переименование
		.pipe(gulp.dest('build/styles/'));
});

gulp.task('clean', function() {
	return gulp.src('build/')
		.pipe(clean());
});

gulp.task('scripts', function() {
	gulp.src('./app/js/*.js')
		.pipe(uglify()) //Минификация скриптов.
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.stream());
});

gulp.task('html', function() {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory: 'app/bower/'
		}))
		.pipe(useref())
		.pipe(gulp.dest('build/'));
});

gulp.task('useref', function() {
	return gulp.src('build/index.html')
		.pipe(useref()) //Выполняет объединение файлов в один по указанным в разметке html комментариев.
		.pipe(gulp.dest('build/'));
});

//Задача для запуска сервера.
gulp.task('browser-sync', function() {
	return browserSync.init({
		server: {
			baseDir: './build/'
		}
	});
});
//Перемешение наших локальных файлов в папку build
gulp.task('assets', function() {
	return gulp.src('./app/assets/**/*.*')
		.pipe(gulp.dest('./build/assets'));
});