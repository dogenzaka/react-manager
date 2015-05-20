
var gulp = require('gulp');
var electron = require('gulp-atom-shell');

gulp.task('electron', ['build', 'electron_mac', 'electron_win32', 'electron_win64']);

gulp.task('electron_mac', function () {
    return gulp.src('./**')
        .pipe(electron({
                  version: '0.26.0',
                  platform: 'darwin'
         }))
        .pipe(electron.zfsdest('app_mac.zip'));
});

gulp.task('electron_win64', function () {
    return gulp.src('./**')
        .pipe(electron({
                  version: '0.26.0',
                  platform: 'win32',
                  arch: "x64"
         }))
         .pipe(electron.zfsdest('app_win64.zip'));
});

gulp.task('electron_win32', function () {
    return gulp.src('./**')
        .pipe(electron({
                  version: '0.26.0',
                  platform: 'win32',
                  arch: "ia32"
         }))
         .pipe(electron.zfsdest('app_win32.zip'));
});
