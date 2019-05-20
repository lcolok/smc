
const fs = require("fs");
const path = require('path');
const del = require('del');
const requestJS = require("request");

const logPath = './server/log/';
module.exports = () => {

    return new Promise((reslove, reject) => {
        requestJS.get(`https://leancloud.cn/1/clients/self/apps`, {
            headers: {
                'Cookie': process.env.lcCookie,
                'X-XSRF-TOKEN': process.env.xsrfToken,
            }
        }, (err, httpResponse, body) => {
            if (!err) {

                const apps = JSON.parse(body);
                // console.log(apps);

                function getGroupName(name) {
                    if (name.includes('@')) {
                        return name.split('@').shift();
                    } else {
                        return undefined
                    }
                }

                for (var app of apps) {
                    if (app.app_id == process.env.LEANCLOUD_APP_ID) {
                        let groupName, groupMembers = [], currentApp = app.app_name;

                        groupName = getGroupName(currentApp);
                        if (groupName) {
                            apps.forEach(e => {
                                if (getGroupName(e.app_name) == groupName) {
                                    groupMembers.push(e.app_name);
                                }
                            });
                        }

                        reslove({
                            groupName, currentApp, groupMembers
                        });
                        del.sync(['!' + logPath, logPath + '**/*']);
                        fs.writeFileSync(path.resolve(logPath + `${app.app_name}.data.json`), JSON.stringify(app, null, 8));
                    }
                }



            } else {
                reject(err);
            }
        })

    })


}
