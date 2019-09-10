const axios = require('axios');

const shortenURL = async ({ params: { origURL } }) => {
	return new Promise(async resolve => {
		async function main(input) {
			let longURL = input.match(/[a-zA-z]+:\/\/[^\s]*/g);

			for (let i = 0; i < longURL.length; i++) {
				let url =
					'https://api.weibo.com/2/short_url/shorten.json?source=560331235&url_long=' +
					encodeURIComponent(longURL[i]);
				let response = await axios.get(url);
				let json = response.data;
				console.log(json);

				let shortURL = json['urls'][0]['url_short'];
				input = input.replace(longURL[i], shortURL);
			}
			return input;
		}

		var shortenedURL = '';
		do {
			shortenedURL = await main(origURL);
		} while (!shortenedURL.match(/http(s?):\/\/t\.cn\/\S+/));

		resolve(shortenedURL);
	});
};

module.exports = shortenURL;
