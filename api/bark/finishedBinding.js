/* eslint-disable no-console */
const AV = require('leanengine');

const bind = async ({ params: { barkID, userID, token } }) => {
	let account = AV.Object.createWithoutData('_User', userID);
	account.set({ barkID, token });

	account.save().then(
		function(account) {
			console.log('barkID为', account.get('barkID'));
		},
		function(error) {
			console.log(error);
		},
	);
};

module.exports = bind;
