const path = require('path');
var fs = require('fs');
const filePath = path.resolve('./api');

var AV = require("leanengine");



fs.readdir(filePath, function (err, files) {
        files
                .filter(name => name.includes('alive.js'))//把index.js筛选出来，去掉
                .forEach((file) => {
            
                        let funcName = file.split('.js').shift();
                        console.log(funcName);
                        let thisFunc = require(filePath + '/' + file);
                        console.log(thisFunc);
                        AV.Cloud.define(funcName,r=>thisFunc(r));
                })
})