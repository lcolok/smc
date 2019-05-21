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
			start: "-21:00:00",
			end: "15:00:00"
		},
		NIGHT: {
			devPort: 3030,
			app_id: "9KIEhTM3pSa4O2iaPLle3Mwe-gzGzoHsz",
			app_key: "tt5ry6ckUo7b86EcEgm0JpO2",
			start: "09:00:00",
			end: "+03:00:00"
		}
	},
	web: {
		dayRequestStart: "00:00:00"
	}
}