var gulp = require('gulp'),
    less = require('gulp-less'),
    notifier = require('node-notifier'),
    combiner = require('stream-combiner2');

var lessInput = './lessfile/*.less';

gulp.task('less', function() {
    var combined = combiner.obj([
        gulp.src(lessInput),
        less(),
        gulp.dest('output')
    ]);

    combined.on('error', notify);

    return (combined);
});

gulp.task('watch', ['less'], function() {
    gulp.watch(lessInput, ['less']);
});

gulp.task('default', ['less'], function() {});

function notify(error) {
    var message = 'In: ';
    var title = 'Error: ';
    if (error.description)
        title += error.description;
    else if (error.message)
        title += error.message;
    if (error.filename) {
        var file = error.filename.split('/');
        message += file[file.length - 1];
    }
    if (error.lineNumber)
        message += '\nOn Line: ' + error.lineNumber;
    if (message === "In: ") message = "";
    notifier.notify({
        title: "Error",
        message: "Less report an error, check console"
    });
    console.error(title + " " + message);
}
