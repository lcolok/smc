const AV = require('leanengine');

const check = ({ params: { code } }) => {
	return new Promise((resolve, reject) => {
		console.log(code);
		const query = new AV.Query('InvitationCode');
		query.equalTo('code', code);
		query.first().then(function(trueCode) {
			if (trueCode) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
};

module.exports = check;
