const AV = require('leanengine');

const use = ({ params: { code } }) => {
	return new Promise((resolve, reject) => {
		console.log(code);
		const query = new AV.Query('InvitationCode');
		query.equalTo('code', code);
		query.first().then(function(trueCode) {
			console.log(trueCode);
			if (trueCode) {
				trueCode.destroy().then(() => resolve(true));
			} else {
				resolve(false);
			}
		});
	});
};

module.exports = use;
