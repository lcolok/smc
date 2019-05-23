const AV = require('leanengine');
const path = require('path');
const apiConfig = require(path.resolve('config/api.config'));
const groupMembers = apiConfig.groupMembers;
const dayjs = require('dayjs');
const requestJS = require('request');

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

setHook_afterSave('Comments');





function setHook_afterSave(className) {


    AV.Cloud.afterSave(className, function (r) {

        let body = {
            className,
            r
        }
        if (awake(you)) {//如果对方醒着的话
            console.log('对方醒着');
            let url, funcName = 'load';
            let eight = groupMembers[you].app_id.substring(0, 8).toLowerCase();
            if (process.env.LEANCLOUD_APP_ENV == 'development') {
                let devPort = groupMembers[you].devPort;
                url = `http://localhost:${devPort}/1.1/functions/${funcName}`;
            } else {
                url = `https://${eight}.engine.lncld.net/1.1/functions/${funcName}`;

            }


            requestJS.post(url, {
                json: true,
                headers: {
                    'X-LC-Id': groupMembers[you].app_id,
                    'X-LC-Key': groupMembers[you].app_key
                },
                body: body
            }, (err, httpResponse, body) => {
                console.log(body);
            })
        } else {
            console.log('对方沉睡中');

        }

    });

    console.log('\n');
    console.log(`Set class ${className} after save hook already`);
    console.log('\n');
}

