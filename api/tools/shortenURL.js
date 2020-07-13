const axios = require('axios');

const shortenURL = async ({ params: { origURL } }) => {
	return xiaomark(origURL);
};

module.exports = shortenURL;

function xiaomark(origURL) {
	return new Promise(async (resolve, reject) => {
		async function main(input) {
			let longURL = input.match(/[a-zA-z]+:\/\/[^\s]*/g);

			console.log(longURL);
			for (let i = 0; i < longURL.length; i++) {
				let response = await axios.post(
					'https://api.xiaomark.com/v1/link/create',
					{
						apikey: process.env.xiaomarkKey,
						domain: 'lc01.cn',
						origin_url: longURL[i],
						group_sid: 'zedhwfky',
					},
				);
				let json = response.data;
				console.log(json);
				if (json.code === 0) {
					let shortURL = json.data.link.url;
					console.log(shortURL);
					input = input.replace(longURL[i], shortURL);
				} else {
					rejecet(json.message);
				}
			}

			return input;
		}

		var shortenedURL = '';
		// do {
		shortenedURL = await main(origURL);
		// } while (!shortenedURL.match(/http(s?):\/\/t\.cn\/\S+/));

		resolve(shortenedURL);
	});
}

function sinaShortURL(origURL) {
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
}
