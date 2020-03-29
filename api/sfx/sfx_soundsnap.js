const axios = require('axios');
const cheerio = require('cheerio');
const requestJS = require('request');
const fs = require('fs');

module.exports = async () => {
	return new Promise((resolve, reject) => {
		requestJS.get(
			'https://www.soundsnap.com/search/audio/button/score',
			(err, httpResponse, body) => {
				if (!err) {
					const $ = cheerio.load(body);
					$('.audio-description').each((i,e)=>{
						let description = e.children[0].data.replace(/[\r\n\t]/g,"");
						console.log(description);
					})
					$('a .audio-title').each((i,e)=>{
						console.log(e.text());
					})

					$('script').each((i, elem) => {
						if (elem.children.length == 0) return;
						const data = elem.children[0].data;
						if (!data) return;
						// console.log("data", data)

						const matcher = data.match(
							/wavesurfer\[eq\]\.backend\.song\s\=\s['"]([\s\S]*)['"];/i,
						);

						if (!matcher) return;
						const url = 'https://www.soundsnap.com/' + matcher[1];
						console.log(url);

						// console.log(elem.children[0].data);
						resolve(url);
					});

					// $('.wave').each((i, elem) => {
					// 	console.log(elem.children);
					// 	resolve(i, elem);
					// });
				} else {
					reject(false);
				}
			},
		);
	});
};
