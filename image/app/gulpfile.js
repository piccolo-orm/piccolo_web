var gulp = require('gulp');
var createFiles = require('./content/create-files.js')


gulp.task('md', function() {
    createFiles()
})


gulp.task("watch", function() {
    gulp.watch("content/md/**/*.md", ['md'])
})


gulp.task("default", ['md'])
