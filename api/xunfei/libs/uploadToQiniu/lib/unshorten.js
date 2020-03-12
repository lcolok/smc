const unfurl = require('unfurl-url');
const _ = require('lodash');
const isURL = require('isurl');

module.exports = async urls => {
	if (urls instanceof Array) {
		let queue = urls.map(url => makePromise(url));
		return Promise.all(queue);
	} else if (urls instanceof Object) {
		let arr1 = [],
			arr2 = [];
		_.forEach(urls, async function(value, key) {
			try {
				let url = new URL(value);
				if (isURL(url)) {
					arr1.push(urls[key]);
					arr2.push(makePromise(value));
				}
			} catch (err) {
				return false;
			}
		});

		return new Promise(async (resolve, reject) => {
			arr1 = await Promise.all(arr2);
			resolve(urls);
		});
	} else {
		return makePromise(urls);
	}
};

function makePromise(url) {
	return new Promise((resolve, reject) => {
		unfurl.url(url, function(error, url) {
			if (!error) {
				resolve(url);
			} else {
				reject(error);
			}
		});
	});
}
