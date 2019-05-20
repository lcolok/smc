module.exports = {
	requires: {
		AV: "leanengine",
		requestJS: "request"
	},
	apiBuildDest: "./server/serverless",
	bundleName: "api.min.js",
	groupMembers: {
		DAY: {
			devPort: 3000,
			app_id: "AdhkBwcsaYxsR87FAFmboFjx-gzGzoHsz",
			app_key: "56am6OhRL8ewwSb4zeoSC5O8",
			start: "2019-05-19T21:00:00+08:00",
			end: "2019-05-20T15:00:00+08:00"
		},
		NIGHT: {
			devPort: 3030,
			app_id: "9KIEhTM3pSa4O2iaPLle3Mwe-gzGzoHsz",
			app_key: "tt5ry6ckUo7b86EcEgm0JpO2",
			start: "2019-05-20T09:00:00+08:00",
			end: "2019-05-21T03:00:00+08:00"
		}
	},
	web: {
		dayRequestStart: "00:00:00"
	}
}