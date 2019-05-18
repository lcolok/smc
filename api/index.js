const path = require('path');
const fs = require('fs');
const filePath = path.resolve('./api');
const requireContext = require('require-context');

const AV = require("leanengine");

const scripts = requireContext(
        filePath, true, /\.js$/
)


scripts.keys()
        .filter(name => !name.includes(__filename.split('/').pop()))//排除掉自己
        .filter(name => !name.includes('config'))//把config文件夹筛选出来，去掉
        .forEach(key => {
                const matched = key.match(/([A-Za-z0-9-_]+)\./i)
                if (matched && matched.length > 1) {
                        // console.log(key);
                        let funcName = key.split('.js').shift();
                        // console.log(funcName);
                        let thisFunc = require(filePath + '/' + key);
                        // console.log(thisFunc);
                        AV.Cloud.define(funcName,r=>thisFunc(r));
                }
        })


/* fs.readdir(filePath, function (err, files) {
        files
                .filter(name => !name.includes('index.js'))//把index.js筛选出来，去掉
                .filter(name => !name.includes('config'))//把config文件夹筛选出来，去掉
                .forEach((file) => {

                        let funcName = file.split('.js').shift();
                        console.log(funcName);
                        let thisFunc = require(filePath + '/' + file);
                        console.log(thisFunc);
                        AV.Cloud.define(funcName,r=>thisFunc(r));
                })
}) */