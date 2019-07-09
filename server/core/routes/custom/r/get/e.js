const AV = require('leanengine');

// express的redirect功能
module.exports = (req, res, next) => {
	const query = new AV.Query('EningeQRCode');
	query.descending('updatedAt');
	let latestPic = query.first().then(obj => {
		console.log(obj.get('images'));
		let url = obj.get('images');
		res.redirect(url);
	});
};
