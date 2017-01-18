import gulp from 'gulp'
import showdown from 'showdown'
import through from 'through2'
import gutil from 'gulp-util'

gulp.task('default', () => {
  console.log('Hello world.');
})


const markdownToHtml = () => {
  const converter = new showdown.Converter({})

  // TODO: how to add <html>??
  return through.obj((file, encoding, cb) => {
    const fileText = file.contents.toString()
    const fileHtml = converter.makeHtml(fileText)
    file.contents = new Buffer(fileHtml)
    file.path = gutil.replaceExtension(file.path, '.html')
    cb(null, file)
  })
}

gulp.task('md2html', () => {
  gulp.src('docs/*.md')
    .pipe(markdownToHtml())
    .pipe(gulp.dest('dist'))
})