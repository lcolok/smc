const axios = require('axios');
const Qs = require('qs');
async function tryCatch(promise) {
	try {
		const ret = await promise;
		return [ret, null];
	} catch (e) {
		return [null, e];
	}
}

function httpRedirect(config) {
	return tryCatch(
		axios.create({
			// timeout: 1500,
			maxRedirects: 0,
			// headers: {
			//     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			//     "Accept-Encoding": "gzip, deflate",
			//     "Accept-Language": "zh-cn",
			//     "Connection": "close",
			//     "Host": "t.cn",
			//     "Upgrade-Insecure-Requests": "1",
			//     "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/72.0.3626.73 Mobile/15E148 Safari/605.1",
			// },
			transformRequest: [data => Qs.stringify(data)],
		})(config),
	);
}

async function expand(url) {
	return new Promise(async (resolve, reject) => {
		if (!url.match('http')) {
			url = 'https://' + url;
		}
		const [resp, error] = await httpRedirect({
			method: 'get',
			url: url,
		});
		if (error) {
			// console.log(error);
			let expandedURL = error.response.headers.location;
			// console.log(error.response.headers);
			// console.log(expandedURL);
			resolve(expandedURL);
		}
	});
}

module.exports = expand;
