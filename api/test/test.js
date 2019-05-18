const requestJS = require("request");

function thisFunc(request) {

    return new Promise((resolve, reject) => {
        requestJS.get('http://worldtimeapi.org/api/timezone/Asia/Hong_Kong', (err, httpResponse, body) => {
            if (!err) {
                body = JSON.parse(body);



                const moment = require("moment");

                const placeholder = moment().format("YYYY-MM-DD")+' ';

                const now = moment();
                const begin = moment(placeholder+"00:00:00");
                const end = moment(placeholder+"12:00:00");

             

                var shouldRun = moment(now).isBetween(begin,end,'hour');



                resolve(shouldRun)
            } else {
                reject(false);
            }
        })
    })
};

thisFunc()

module.exports = thisFunc
