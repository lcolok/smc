const fs = require('fs');
const express = require('express');

const router = express.Router;
const rules = ['get', 'post']; //读取文件夹的规则

function readAllCustom(params) {
	let currentPath = params.root;
	let dir = params.dir;
	// console.log(dir);
	fs.readdirSync(currentPath).forEach(function(ele, index) {
		if (rules.includes(ele)) {
			let method = ele;
			let newRouter = new router();
			fs.readdirSync(currentPath + '/' + method)
				.filter(e => e.match(/\.js/)) //过滤掉非js的文件
				.forEach((e, index) => {
					let funcName = e
						.split('/')
						.pop()
						.split('.js')
						.shift();
					let apiPath = currentPath + '/' + method + '/' + e;
					newRouter[method]('/' + funcName, require(apiPath));
					params.app.use('/' + dir, newRouter); // require同名文件夹
					// console.log({ funcName, method, dir, currentPath, apiPath });
				});
		} else {
			let info = fs.statSync(currentPath + '/' + ele);
			if (info.isDirectory()) {
				// console.log("dir: " + ele)
				readAllCustom({
					root: currentPath + '/' + ele,
					dir: ele,
					app: params.app,
				});
			} else {
				// console.log("file: " + ele)
			}
		}
	});
}

module.exports = {
	readAllCustom,
};
