const path = require('path');
const expand = require(path.resolve('server/utils/expandUtils'));

module.exports = async (req, res, next) => {
	let params = req.query;
	let url = params.url;
	let expandedURL = await expand(url);
	res.json({ expandedURL });
};
