const fs = require('fs');
const express = require('express');
const path = require('path');

const router = express.Router;
const rules = ['get', 'post']; //读取文件夹的规则

function readAllCustom(params) {
	let currentPath = params.root,
		dir = params.dir;
	// console.log(dir);
	fs.readdirSync(currentPath).forEach(function(ele, index) {
		let newPath = path.join(currentPath, ele);
		if (rules.includes(ele)) {
			let newRouter = new router();
			fs.readdirSync(newPath)
				// .filter(e => e.match(/\.js/)) //过滤掉非js的文件
				.forEach((e, index) => {
					let funcName = e.match('.js') ? e.split('.js').shift() : e;
					console.log(funcName);
					if (funcName) {
						let apiPath = path.join(newPath, e);
						newRouter[ele]('/' + funcName, require(apiPath));
						params.app.use('/' + dir, newRouter); // require同名文件夹
						// console.log({ funcName, ele, dir, currentPath, apiPath });
					}
					return;
				});
		} else {
			let info = fs.statSync(newPath);
			if (info.isDirectory()) {
				// console.log("dir: " + ele)
				readAllCustom({
					root: newPath,
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
