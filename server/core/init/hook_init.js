console.log('\n');

const AV = require('leanengine');
const path = require('path');
const apiConfig = require(path.resolve('config/api.config'));
const groupMembers = apiConfig.groupMembers;
const dayjs = require('dayjs');
const axios = require('axios');

function awake(who) {//day or night
    const start = time(groupMembers[who].start);
    const end = time(groupMembers[who].end)

    function time(t) {
        t = t.toString();
        let colonArr = t.match(/:/g);
        let l = colonArr ? colonArr.length : 0;
        let ct = t.replace(/[^\d:]/g, '');//清除多余的符号和空格
        for (let i = l; i < 2; i++) {
            ct = ct + ':00';
        }
        let d = dayjs();
        ct = `YYYY-MM-DD ${ct}`;
        if (t.includes('+')) {//后一天
            d = d.add(1, 'day');
        } else if (t.includes('-')) {//前一天
            d = d.subtract(1, 'day');
        }
        return dayjs(d.format(ct))
    }
    if (dayjs().isAfter(start) && dayjs().isBefore(end)) {
        return true
    } else {
        return false
    }
}

function opposite(me) {
    return me == "DAY" ? "NIGHT" : "DAY";
}

function whoAmI() {
    for (let i in groupMembers) {
        if (groupMembers[i].app_id == process.env.LC_APP_ID && groupMembers[i].app_key == process.env.LC_APP_KEY) {
            return i
        }
    }
}

const me = whoAmI();
const you = opposite(me);

setHook('afterSave', 'Comments');


function send(id, payload) {
    let url,
        funcName = 'load',
        eight = id.substring(0, 8).toLowerCase();

    if (process.env.LEANCLOUD_APP_ENV == 'development') {//开发模式下进行本地请求
        let devPort = groupMembers[you].devPort;
        url = `http://localhost:${devPort}/1.1/functions/${funcName}`;
    } else {//生产环境进行远程请求
        url = `https://${eight}.engine.lncld.net/1.1/functions/${funcName}`;

    }


    /*     requestJS.post(url, {
            json: true,
            headers: {
                'X-LC-Id': groupMembers[you].app_id,
                'X-LC-Key': groupMembers[you].app_key
            },
            body: payload
        }, (err, httpResponse, body) => {
            console.log(body);
        }) */



    axios({
        url,
        method: 'POST',
        headers: {
            'X-LC-Id': groupMembers[you].app_id,
            'X-LC-Key': groupMembers[you].app_key
        },
        data: payload,
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}







function setHook(hookName, className) {

    const action = hookName.replace(/before|after/g, '').toLowerCase();

    console.log({ action });

    AV.Cloud[hookName](className, function (request) {
        const real_id = request.object.id;
        const real_createdAt = request.object.createdAt;
        const real_updatedAt = request.object.updatedAt;

        request.object.set('real_id', real_id);
        request.object.set('real_createdAt', real_createdAt);
        request.object.set('real_updatedAt', real_updatedAt);


        let attributes = request.object.attributes;

        let payload = {
            className,
            action,
            attributes
        }

        switch (hookName) {
            case 'afterSave':

                if (awake(you)) {//如果对方醒着的话
                    console.log('对方醒着');
                    // console.log(request.object);
                    console.log(payload.attributes);
                    send(groupMembers[you].app_id, payload);
                } else {
                    console.log('对方沉睡中');

                    // 声明类型
                    var ToSync = AV.Object.extend('ToSync');
                    // 新建对象

                    var toSync = new ToSync();

                    toSync.set(payload);

                    /*             // 设置名称
                                toSync.set('classToSync', payload.className);
                                toSync.set('action', payload.action);
                                // 遍历设值
                    
                                // for (var i in payload.request) {
                                //     toSync.set(i, JSON.stringify(payload.request[i]));
                                // }
                    
                    
                    
                                for (var i in request.object.attributes) {
                                    toSync.set(i, request.object.attributes[i]);
                                } */

                    toSync.save().then(function (sync) {
                        console.log('objectId is ' + sync.id);
                    }, function (error) {
                        console.error(error);
                    });
                }
                break;
        }
        return request.object.save().then(function (user) {
            console.log(`ok!已经更新 ${className}`, user);
        });
    });
    console.log(`Set class ${className} ${hookName} hook already`);
}

setTimeout(() => {
    if (me == 'DAY') {
        send(groupMembers[you].app_id, { className: 'Comments' });
    }
}, 500);

console.log('\n');