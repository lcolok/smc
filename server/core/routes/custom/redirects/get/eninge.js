const AV = require('leanengine');
const query = new AV.Query('Redirects');
query.descending('updatedAt');
let latestPic = query.first();

// express的redirect功能
module.exports = (req, res, next) => {
	// res.redirect('latestPic.uploaderURL');
	res.json(latestPic);
};
