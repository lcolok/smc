const Vue = require('vue');
const fs = require('fs');
const path = require('path');
// 第一步： 创建一个 Vue 实例
const app = new Vue({
	data: {
		msg: 'Hello Vue SSR',
	},
	template: `<div>{{msg}}</div>`,
});

// 第二步： 创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer({
	template: fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8'),
});

module.exports = (req, res, next) => {
	renderer.renderToString(app, (err, html) => {
		if (err) {
			res.status(500).end('Internal Server Error');
			return;
		}
		res.end(html);
	});
};
