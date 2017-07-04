var gulp = require('gulp');
var concat = require('gulp-concat');  //链接文件
var uglify = require('gulp-uglify');  //js压缩
var imagemin = require('gulp-imagemin');  //图片压缩
var del = require('del');   //删除
var gutil = require('gulp-util');  
const babel = require('gulp-babel');  //es6转为es5
var postcss = require('gulp-postcss'); //css压缩
var autoprefixer = require('autoprefixer'); //css fix
var cleanCSS = require('gulp-clean-css');  //css加前缀
let livereload = require('gulp-livereload');

gulp.task('reset', function() {
  return del(['build']);
});

gulp.task('js', ['reset'], function() {
  return gulp.src('./js/*.js')
	.pipe(babel({presets:['env']}))
        .pipe(uglify())
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('build/js/'));
});

gulp.task('onlyjs',function() {
  return gulp.src('./js/*.js')
	.pipe(babel({presets:['env']}))
        .pipe(uglify())
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('build/js/'))
	.pipe(livereload())
});


gulp.task('css',['reset'],function(){
  return gulp.src('./*.css')
	.pipe(postcss([autoprefixer()]))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('build/'));
});


gulp.task('onlycss',function(){
  return gulp.src('./*.css')
	.pipe(postcss([autoprefixer()]))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('build/'))
	.pipe(livereload())
});

const imagesPath = './img/**/*.{gif,jpg,png}'
gulp.task('images', ['reset'], function(){
  return gulp.src(imagesPath)
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/'))
})
gulp.task('onlyimages', function(){
  return gulp.src(imagesPath)
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/'))
    .pipe(livereload())
  
})

gulp.task('html', ['reset'], function(){
  return gulp.src('./*.html')
    .pipe(gulp.dest('build/'));
})

gulp.task('json', ['reset'], function(){
  return gulp.src('./json/*.json')
    .pipe(gulp.dest('build/json/'));
})

gulp.task('watch',['js','css','images','json','html'], function() {
  livereload.listen();
  gulp.watch('./js/*.js', ['onlyjs']);
  gulp.watch('./*.css', ['onlycss']);
  gulp.watch(imagesPath, ['onlyimages']);
});

gulp.task('default', ['js','css','images','json','html','watch']);

 
