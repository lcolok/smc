// var requireDir = require('require-dir');
// var dir = requireDir('./tasks');

const gulp = require('gulp');
const child_process = require('child_process');
const exec = child_process.exec;

//加载 tasks 目录中的所有 child gulp 任务

const path = require('path');
const fs = require('fs');
const tasksPath = path.resolve('./gulpfile.js/tasks');
const requireContext = require('require-context');

const tasks = requireContext(
    tasksPath, true, /\.js$/
)
tasks.keys()
    .filter(name => !name.includes(__filename.split('/').pop()))//排除掉自己
    .forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {

            let taskName = key.split('/').pop().split('.js').shift();
            // console.log('-fs'+taskName); 
            let thisFunc = require(tasksPath + '/' + key);
            // console.log('-fs'+thisFunc);
            gulp.task(taskName, thisFunc);
        }
    })



//定义 parent gulp 任务


gulp.task('deployLeanCloud', function (cb) {
    exec('lean deploy', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task('deploy',
    gulp.series(
        gulp.parallel(
            'buildLeanCloudAPI',
        ),
        'deployLeanCloud'
    ));

gulp.task('dev',
    gulp.series(
        // gulp.parallel(
        //     'buildLeanCloudAPI',
        // ),
        'leanUp'
    ));

gulp.task('default',
    cb => {
        cb();
    });




