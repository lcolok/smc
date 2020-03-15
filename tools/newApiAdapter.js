module.exports = {
	post: async function(req, res, next, api) {
		api(req, res, next);
	},
};
