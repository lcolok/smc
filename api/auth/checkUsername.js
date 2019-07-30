const AV = require('leanengine');

const check = ({ params: { username } }) => {
	return new Promise((resolve, reject) => {
		console.log(username);
		const query = new AV.Query('_User');
		query.equalTo('username', username);
		query.first().then(function(usernameObj) {
			// console.log(usernameObj);
			if (usernameObj) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
};

module.exports = check;
