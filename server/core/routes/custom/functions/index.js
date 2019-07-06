'use strict';
var router = require('express').Router();
var AV = require('leanengine');
const fs = require('fs');



// console.log(__filename);
// console.log(__filename);




// const filePath = path.resolve('./server/core/routes');
// const scripts = requireContext(
//     filePath, true, /\S/
// )
// scripts.keys()
//     .filter(name => !name.includes(__filename.split('/').pop()))//排除掉自己
//     .filter(name => !name.includes('config'))//把config文件夹筛选出来，去掉
//     .forEach(key => {
//         const dirname = key.split('/').shift();
//         app.use('/' + dirname, require(filePath + '/' + dirname));// require同名文件夹
//     })


// router.get('/su', require('./get/su'))
// router.get('/baidu', require('./get/baidu'))

let path = __dirname;
// console.log(__dirname);
fs
    .readdirSync(path)
    .forEach(function (method, index) {
        let deepPath = path + "/" + method;
        let info = fs.statSync(deepPath);
        if (info.isDirectory()) {
            // console.log("dir: " + method)
            fs
                .readdirSync(deepPath)
                .forEach(function (e, index) {

                    let funcName = e.split('/').pop().split('.js').shift();
                    // console.log(method);

                    console.log(`./${method}/${funcName}`);
                    router[method]('/' + funcName, require(`./${method}/${funcName}`))


                })
        }
    })


// 新增 Todo 项目
router.post('/', function (req, res, next) {
    var content = req.body.content;
    var todo = new Todo();
    todo.set('content', content);
    todo.save().then(function (todo) {
        res.redirect('./views/todos');
    }).catch(next);
});

module.exports = router;
