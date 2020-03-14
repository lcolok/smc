module.exports = {
	post: async function(req, res, next, api) {
		let params = req.body.params;
		let r = await api({ params });
		res.send(r);
	},
};
