const fs = require('fs');
const express = require('express');
const path = require('path');

const router = express.Router();
const rules = ['get', 'post']; //读取文件夹的规则,假如文件夹名字匹配其中一项，就会判定这是要读取的method

let allFunc = {};

module.exports = function(root) {
	// console.log(dir);

	readOne(root);
	return { router, allFunc };

	function readOne(currentPath) {
		fs.readdirSync(currentPath).forEach(function(ele, index) {
			let newPath = path.join(currentPath, ele);
			if (rules.includes(ele)) {
				fs.readdirSync(newPath)
					// .filter(e => e.match(/\.js/)) //过滤掉非js的文件
					.forEach((e, index) => {
						let funcName = e.match('.js') ? e.split('.js').shift() : e;
						// console.log(funcName);
						if (!allFunc[funcName]) {
							let apiPath = path.join(newPath, e);
							let finalPath = currentPath.replace(root, '');
							router[ele](path.join(finalPath, funcName), require(apiPath));
							// console.log({ finalPath });

							allFunc[funcName] = { funcName, finalPath };
							// console.log({ allFunc });
						} else {
							throw Error('不能定义同名函数:' + funcName);
						}
						return;
					});
			} else {
				let info = fs.statSync(newPath);
				if (info.isDirectory()) {
					// console.log("dir: " + ele)
					readOne(newPath);
				} else {
					// console.log("file: " + ele)
				}
			}
		});
	}
};
