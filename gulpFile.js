/**
 * Created by humorHan on 2017/2/10.
 */
var path = require("path");
var gulp = require('gulp');
var tiny = require('gulp-tinypng');
var vinylPaths = require('vinyl-paths');
var del = require('del');


/** 压缩图片
 * old做备份文件夹  src是图片源文件  dist存放压缩后的文件
 * 该插件会缓存上次压缩后的图片到old文件夹，然后会自动清空dist文件夹，然后把新压缩的文件放到dist文件夹
 * */

//压缩图片
gulp.task('bundle', ['del'], function () {
    return gulp.src(path.join(__dirname, '/src/*.{png,jpg}'))
        .pipe(tiny('ESUKcbJt9lRkplqmVQLZ9Ot5uAeY2f95'))
        .pipe(gulp.dest(path.join(__dirname,'/dist/')));
});

//清理dist文件夹
gulp.task('del', ['old'], function () {
    return gulp.src(path.join(__dirname, '/dist'), {read: false})
        .pipe(vinylPaths(del));
});

//备份old
gulp.task('old', ['del-old'], function () {
    return gulp.src(path.join(__dirname, '/dist/*.{png,jpg}'))
        .pipe(gulp.dest(path.join(__dirname,'/old/')));
});

//清理old文件夹
gulp.task('del-old', function () {
    return gulp.src(path.join(__dirname, '/old'), {read: false})
        .pipe(vinylPaths(del));
});