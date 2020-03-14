const apiAdapter = require('../../../../../../tools/apiAdapter');

module.exports = (req, res, next) => {
	let allFunc = res.allFunc;
	let funcName = req.query.funcName;
	let info = allFunc[funcName];
	info.func(req, res, next);
};
