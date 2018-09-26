
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compileSass', () =>{
    //执行任务时,会执行这里的代码

    //在此把sass编译成css
    //2.找出scss文件
     gulp.src(['./src/sass/*.scss'])  //返回一个文件

        //编译scss->css
        .pipe(sass({ outputStyle: "compact" }).on('error', sass.logError))   //得到css文件流


        //输出到硬盘
        .pipe(gulp.dest('./src/css/'))


});


// 自动刷新页面
// 文件有修改，自动刷新页面
var browserSync = require('browser-sync');

gulp.task('server',()=>{
	// 启动一个自动刷新的服务器
	 browserSync({
		//创建一个静态服务器
		// server:'./src',

		// 指定端口
		port:1996,

		// 代理服务器
		// 用browserSync代理php服务器
		// 	* 识别php
		// 	* 自动刷新
		proxy:'http://localhost:1996',

		// 监听文件修改
		files:['./src/**/*.html','./src/css/*.css','./src/sass/*.scss'],
	});

	// 监听sass修改
	gulp.watch('./src/sass/*.scss',['compileSass']);
});



// //布置任务：压缩css文件
// var cssmin=require('gulp-cssmin');

// gulp.task('cssmin',function(){
// 	return gulp.src('./src/css/*.css')
// 			   .pipe(cssmin())
// 			   .pipe(gulp.dest('./dist'));
// });

// // //布置任务：重命名
// var rename=require('gulp-rename');
// gulp.task('cssrename',function(){
// 	return gulp.src('./src/dist')
// 			   .pipe(cssmin())
// 			   .pipe(rename('goods.min.css'))
// 			   .pipe(gulp.dest('./dist'));
// });

// //布置任务：压缩js
// var jsmin=require('gulp-uglify');

// gulp.task('jsmin',function(){
// 	return gulp.src('./src/js/*.js')
// 			   .pipe(jsmin())
// 			   .pipe(rename('.min.js'))
// 			   .pipe(gulp.dest('./dist'));
// });

// //压缩图片

// var imagemin=require('gulp-imagemin');

// gulp.task('imagemin',function(){
// 	return gulp.src('./src/img/*')
// 			   .pipe(imagemin())
// 			   .pipe(gulp.dest('./dist/img'));
// });

// //合并文件

// var concat=require('gulp-concat');

// gulp.task('concat',function(){
// 	return gulp.src(['./src/*.js'])
// 			   .pipe(concat('all.js'))
// 			   .pipe(gulp.dest('./dist'));
// });


// gulp.watch('./src/sass/*.scss',['compileSass'])
// //自动化编译
// //
// gulp.task('autoSass',function(){
    
// })

// js压缩
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var babel = require('gulp-babel');

gulp.task('minifyjs', function() {
    //gulp.src([])可以用数组的形式加载不同格式，不同位置的文件
	return gulp.src(['./src/js/*.js','!./src/js/require.js','!./src/js/custom.js'])
		.pipe(babel({
			presets: ['es2015'] // es5检查机制
		}))
		.pipe(uglify())    //压缩
		.on('error', function (err) {
			gutil.log(gutil.colors.red('[Error]'), err.toString());
		})
		.pipe(concat('main.js'))    //合并所有js到main.js

		.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
		.pipe(gulp.dest('minified/js'))    //输出dist.js到文件夹
        // .pipe(gulp.dest('minified/js'));  //输出
});