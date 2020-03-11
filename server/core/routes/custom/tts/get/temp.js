module.exports = async (req, res, next) => {
	let params = req.query;
	res.header(
		'Content-Disposition',
		'attachment; filename="' + params.n + '.mp3"',
	);
	res.sendFile(`/tmp/tts/${params.n}.mp3`);
};
