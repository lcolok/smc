// const AV = require('leancloud-storage');

module.exports = async (req, res, next) => {
	let funcName = req.query.funcName;
	let func = res.allAPI[funcName];
	req.params = req.body;
	let r = await func(req, res, next);
	res.send(r);
};
