// const CryptoJS = require("./crypto"); //和 crypto-js 同一个函数
const CryptoJS = require('crypto-js');
const axios = require('axios');

const _ = require('lodash');
const fs = require('fs-extra');

const localStorage = {
	DATAAUDIT:
		'WWFRSSFcIyd9WX1rVlBRQ0dZJSwuLmdPN0UiVVlEJnxOLmY1XkA0fDBqRT9lSjwudm9vdHZOPHs4QVxccCx5MA==',
};
var ajaxurlip = 'http://pygwww.jwcz1.com/web-server';
var channel = '40000001';
var myAES = '';

var myAjax = function(url, e, b, successFunc, errorFunc) {
	if (b) {
		e = JSON.parse(e);
	}

	axios
		.post(ajaxurlip + url, e)
		.then(function(response) {
			if (response.status == 200) {
				if (successFunc != null) {
					successFunc(response.data);
				}
			}
		})
		.catch(function(error) {
			errorFunc(error);
			console.log(error);
		});
	//     d.open("POST", ajaxurlip + url, true);
	//     if (b) {
	//       d.setRequestHeader("Content-type", "application/json");
	//     }
	//     d.send(e);
	//   d.onreadystatechange = function() {
	//     if (d.readyState == 4 && d.status == 200) {
	//       if (successFunc != null) {
	//         successFunc(d.responseText);
	//       }
	//     } else {
	//       if (d.readyState == 4) {
	//         if (errorFunc != null) {
	//           errorFunc(d);
	//         }
	//       }
	//     }
	//   };
};
function getAES(a) {
	myAjax('/exchange', null, false, function(b) {
		localStorage.DATAAUDIT = b;

		//     if (a) {
		//       a(b);
		//     }
	});
}
var setAES = function() {
	var c = CryptoJS.enc.Utf8.stringify(
		CryptoJS.enc.Base64.parse(localStorage.DATAAUDIT),
	);
	var b = c.substring(16, c.length - 16);
	for (var a = 0; a < b.length; a += 2) {
		myAES += b.charAt(a);
	}
};

var getAjax = function(e, g, c, h, b, d) {
	if (!myAES && localStorage.DATAAUDIT) {
		setAES();
	}
	requestMethod();

	function requestMethod() {
		var f = CryptoJS.AES.encrypt(g, CryptoJS.enc.Utf8.parse(myAES), {
			v: '',
			mode: CryptoJS.mode.ECB,
		}).toString();
		var a = JSON.stringify({
			req: f,
		});
		myAjax(
			e,
			a,
			c,
			function(i) {
				//   var k = JSON.parse(i); axios 返回的 data本来就是json
				var k = i;
				if (k.status == 0) {
					var j = CryptoJS.AES.decrypt(k.body, CryptoJS.enc.Utf8.parse(myAES), {
						iv: '',
						mode: CryptoJS.mode.ECB,
					});
					j = JSON.parse(CryptoJS.enc.Utf8.stringify(j));
					if (h != null) {
						h(j);
					}
				} else {
					if (b != null) {
						b(JSON.parse(i));
					}
				}
			},
			function(i) {
				if (d != null) {
					d(i);
				}
			},
		);
	}
};

function ClearBr(a) {
	a = a.replace(/[\r\n]/g, '');
	a = a.replace(/\[0.5\u79d2]/g, '[p500]');
	a = a.replace(/\[1\u79d2]/g, '[p1000]');
	a = a.replace(/\[2\u79d2]/g, '[p2000]');
	a = a.replace(/(^\s*)|(\s*$)/g, '');
	return a;
}

getAES();

function getSpeakerList() {
	return new Promise((resolve, reject) => {
		var data =
			'{"channel": "' + channel + '","speaker_type":"1","page_size":"100"}';
		getAjax(
			'/1.0/speaker_list_qry2',
			data,
			true,
			function(data) {
				if (data.speakers.length > 0) {
					resolve(data.speakers);
				} else {
					reject();
				}
			},
			err => reject(err),
		);
	});
}

function play({ text, vid }) {
	return new Promise((resolve, reject) => {
		var intonationsize = 50; //音高
		intonationsize = parseInt(intonationsize);
		var content = `[te${intonationsize}]${text}`;
		var e =
			'{"channel": "' +
			channel +
			'","synth_text_hash_code":"' +
			CryptoJS.MD5(ClearBr(content)) +
			'"}';
		getAjax('/1.0/works_synth_sign', e, true, function(data) {
			const engineUrl = 'http://peiyinge-proxy.xfyousheng.com:17063/synth';
			const window = {
				sc: 1432,
				web_i_ss: 'F9E21A87D40B963ABC3180E0E8C9E3DF',
			};
			axios
				.get(engineUrl, {
					params: {
						ts: data.time_stamp,
						sign: data.sign_text,
						vid, //声优ID 彬哥:65090 楠楠:60130 粤语女声:10003 程程:65080
						f: 'v2',
						cc: window.sc,
						sid: window.web_i_ss,
						volume: 0,
						speed: 0,
						listen: 0, //必须0,不然有水印
						content: ClearBr(content),
					},
					responseType: 'stream',
				})
				.then(e => {
					resolve(e);
				})
				.catch(e => {
					// reject(e);
				});
		});
	});
}

module.exports = { play, getSpeakerList };
