/**
 * Created by humorHan on 2017/2/10.
 */
var fs = require('fs');
var path = require("path");
var gulp = require('gulp');
var tiny = require('gulp-tinypng');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var gutil = require('gulp-util');

var compressNum, totalNum;
//统计图片数量
gulp.task('bundle', ['tinyPng'], function () {
    fs.readdir(path.join(__dirname, 'src'), function (err, files) {
        //gutil.log(gutil.colors.green('符合格式的图片: ' + filterImg(files) + '张'));
        compressNum = filterImg(files);
        handleResult();
    });
    fs.readdir(path.join(__dirname, 'dist'), function (err, files) {
        //gutil.log(gutil.colors.green('压缩成功的图片：' + filterImg(files) + '张'));
        totalNum = filterImg(files);
        handleResult();
    })
});

//压缩图片
gulp.task('tinyPng', ['del'], function () {
    return gulp.src(path.join(__dirname, '/src/*.{png,jpeg,jpg}'))
        .pipe(tiny('ESUKcbJt9lRkplqmVQLZ9Ot5uAeY2f95'))
        .on('error', function(err){
            throw Error(Error, err.message);
        })
        .pipe(gulp.dest(path.join(__dirname, '/dist/')));
});

//清理dist文件夹
gulp.task('del', function () {
    return gulp.src(path.join(__dirname, '/dist'), {read: false})
        .pipe(vinylPaths(del));
});

function filterImg(files){
    files.forEach(function (file, index) {
        if (!/\.(png|jpeg|jpg)$/.test(file)) {
            files.splice(index, 1);
        }
    });
    return files.length;
}

function handleResult(){
    if (compressNum && totalNum) {
        if (compressNum !== totalNum) {
            gutil.log(gutil.colors.red(compressNum + '/' + totalNum + ' 存在未压缩文件，请核实！'));
        } else {
            gutil.log(gutil.colors.green(compressNum + '/' + totalNum));
        }
    }
}