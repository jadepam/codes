const gulp = require('gulp');
const sftp = require('gulp-sftp-up4');

gulp.task('default', () => {
  return gulp.src('./dist/**/*')
    .pipe(sftp({
      host: '',
      port: 22,
      user: '',
      pass: '',
      remotePath: '',
    }));
});
