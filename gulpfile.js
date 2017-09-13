var gulp = require('gulp');

var minifycss = require('gulp-minify-css'), 
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    minhtml = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext');


gulp.task('html', function() {
  return gulp.src('pages/*.html')
     	     .pipe(minhtml({collapseWhitespace: true}))
	     .pipe(gulp.dest('dist/pages'));
});

gulp.task('css', function(argument) {
  var processors = [
    autoprefixer,
    cssnext
  ];
  return gulp.src('styles/*.css')
      .pipe(postcss(processors))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/styles/'));
});

gulp.task('js', function(argument) {
  gulp.src('js/*.js')
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js/'));
});

gulp.task('img', function(argument) {
  gulp.src('img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img/'));
});

gulp.task('clear', function() {
  gulp.src('dist/*', {read: false})
      .pipe(clear());
});

gulp.task('build', ['html', 'css', 'js', 'img']);
