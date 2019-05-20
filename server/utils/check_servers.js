
const fs = require("fs");
const path = require('path');
const del = require('del');
const requestJS = require("request");

const logPath = './server/log/';

requestJS.get(`https://leancloud.cn/1/clients/self/apps`, {
    headers: {
        'Cookie': process.env.lcCookie,
        'X-XSRF-TOKEN': process.env.xsrfToken,
    }
}, (err, httpResponse, body) => {
    if (!err) {

        const apps = JSON.parse(body);
        // console.log(apps);


        for (var app of apps) {
            if (app.app_id == process.env.LEANCLOUD_APP_ID) {
                console.log('Current_App_Name:', app.app_name);
                del.sync(['!' + logPath, logPath + '**/*']);
                fs.writeFileSync(path.resolve(logPath + `${app.app_name}.data.json`), JSON.stringify(app, null, 8));
            }
        }



    } else {
        console.log(err);
    }
})

