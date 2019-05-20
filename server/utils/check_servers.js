
const fs = require("fs");
const path = require('path');
const del = require('del');
const requestJS = require("request");
const configer = require(path.resolve('tools/configer'));

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
                const appJSON = {};


                function getGroupName(name) {
                    if (name.includes('@')) {
                        return name.split('@').shift();
                    } else {
                        return undefined
                    }
                }

                apps.map(app => {
                    appJSON[app.app_name] = app;
                })



                for (var app of apps) {

                    let groupName, groupMembers = [], currentApp = app.app_name;



                    if (app.app_id == process.env.LEANCLOUD_APP_ID) {


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

                        // //记录一下 app 的其他 data （非调试可关掉）
                        // del.sync(['!' + logPath, logPath + '**/*']);
                        // fs.writeFileSync(path.resolve(logPath + `${app.app_name}.data.json`), JSON.stringify(app, null, 8));


                        const configPath = path.resolve('config/api.config.js');
                        const apiConfig = require(configPath);

                        groupMembers.forEach(e => {
                            let name = e.split('@').pop();
                            let detail = appJSON[e];
                            apiConfig.groupMembers[name].app_id = detail.app_id;
                            apiConfig.groupMembers[name].app_key = detail.app_key;
                        })

                        configer.save(configPath, apiConfig);
                    }
                }





            } else {
                reject(err);
            }
        })

    })


}
