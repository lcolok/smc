const AV = require('leancloud-storage');

module.exports = async (req, res, next) => {
	let funcName = req.query.funcName;
	AV.Cloud.run(funcName, req.body).then(result => res.send(result));
};
