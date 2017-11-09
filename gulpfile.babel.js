import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import webpackConfig from './webpack/webpack.config';

gulp.task('run-webpack', ['clean'], (cb) => {
  webpack(webpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);
    plugins.util.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('copy-vendor', ['clean'], () => {
  return gulp.src('vendor/**/*')
    .pipe(gulp.dest('./build/vendor'))
});

gulp.task('copy-popup-html', ['clean'], () => {
  return gulp.src('src/popup/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('copy-chrome-files', ['clean'], () => {
  return gulp.src('chrome/**/*')
  .pipe(gulp.dest('./build'))
});

gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', ['run-webpack', 'copy-chrome-files', 'copy-popup-html', 'copy-vendor']);

gulp.task('watch', ['default'], () => {
  gulp.watch('src/popup/**/*', ['build']);
  gulp.watch('src/content/**/*', ['build']);
  gulp.watch('src/background/**/*', ['build']);
  gulp.watch('src/state/**/*', ['build']);
  gulp.watch('src/lib/**/*', ['build']);
});

gulp.task('default', ['build']);
