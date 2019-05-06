function thisFunc(request) {


    return new Promise((resolve, reject) => {
        var currentDate = new Date();
        var dayjs = require('dayjs');

        requestJS.get('http://worldtimeapi.org/api/timezone/Asia/Hong_Kong', (err, httpResponse, body) => {
            if (!err) {
                body = JSON.parse(body);
                console.log(body.unixtime);

                dayjs(body.unixtime)
                var now = dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')

                resolve(now)
            } else {
                reject(false);
            }
        })
    })
};
