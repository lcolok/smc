/* 请使用function thisFunc(){} 来定义该文件的API */

module.exports = {
    requires: {
        AV: "leanengine",
        requestJS: "request"
    },
    apiBuildDest: "./server/serverless",
    bundleName: "api.min.js",
    server: {
        devPort: {
            DAY: 3000,
            NIGHT: 3030
        },
    }
}