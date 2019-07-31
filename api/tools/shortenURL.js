const axios = require('axios');

const shortenURL = async ({ params: { origURL } }) => {
	return new Promise((resolve, reject) => {
		console.log(origURL);
		var longURL = origURL.match(/[a-zA-z]+:\/\/[^\s]*/g) || origURL;
		var url =
			'http://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long=' +
			encodeURIComponent(longURL);
		axios.get(url).then(response => {
			var json = response.data;
			var shortURL = json['urls'][0]['url_short'];
			resolve(shortURL);
		});
	});
};

module.exports = shortenURL;
