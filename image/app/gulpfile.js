var gulp = require('gulp');
var markdown = require('gulp-markdown');
var rename = require('gulp-rename');


gulp.task('md', function() {
    gulp.src('md/*.md')
    .pipe(markdown())
    .pipe(rename({extname: ".html"}))
    .pipe(gulp.dest('public/html'));
})


gulp.task("watch", function() {
    gulp.watch("md/*.md", ['md'])
})


gulp.task("default", ['md'])
