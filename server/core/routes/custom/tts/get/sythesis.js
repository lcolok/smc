module.exports = async (req, res, next) => {
	let params = req.query;

	console.log(params);
	res.attachment(params.attname);
	// res.header('Content-Disposition', 'attachment; filename="' + params.attname);
	res.sendFile(params.path);
};
