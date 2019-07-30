const AV = require('leanengine');

const bind = async ({ params: { barkID, userID } }) => {
	let account = AV.Object.createWithoutData('_User', userID);
	account.set('barkID', barkID);
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
