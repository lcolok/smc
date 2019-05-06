function thisFunc(request) {

    return new Promise((resolve, reject) => {

        requestJS.get('http://worldtimeapi.org/api/timezone/Asia/Hong_Kong', (err, httpResponse, body) => {

            body = JSON.parse(body);

            if (!err) {
                var now = body.datetime
                resolve(now)
            } else {
                reject(false);
            }
        })
    })
};

