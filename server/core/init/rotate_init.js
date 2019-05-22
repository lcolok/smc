const dayjs = require('dayjs');
const path = require('path');
const configer = require(path.resolve('tools/configer'));
const apiConfig = require(path.resolve('config/api.config'));


const orig = apiConfig.web.dayRequestStart;//自行设定起始时间点
const start = time(orig);
// if (start.format('HH:mm:ss') == apiConfig.web.dayRequestStart) { return }
const end = time(orig).add(12, 'hour');
const unit = 3;

const todayZero = dayjs(dayjs().format(`YYYY-MM-DDT00:00:00+08:00`));//中国北京时间的今天的零点;
const tomorrowZero = todayZero.add(1, 'day');

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

// const rule = undefined;

const dayStart = start.subtract(unit, 'hour');
const dayEnd = end.add(unit, 'hour');

const nightStart = end.subtract(unit, 'hour');
const nightEnd = start.add(1, 'day').add(unit, 'hour');

// console.log('\n')

// console.log(dayjs().isAfter(nightStart) && dayjs().isBefore(nightEnd));

// console.log('\n')

function PoM(t) {//Plus or Minus
        let o, ft = dayjs(t).format('HH:mm:ss');
        if (dayjs(t).isBefore(todayZero)) {
                o = '-' + ft;
        } else if (dayjs(t).isAfter(tomorrowZero)) {
                o = '+' + ft;
        } else {
                o = ft;
        }
        return o;
}


apiConfig.groupMembers.DAY.start = PoM(dayStart);
apiConfig.groupMembers.DAY.end = PoM(dayEnd);
apiConfig.groupMembers.NIGHT.start = PoM(nightStart);
apiConfig.groupMembers.NIGHT.end = PoM(nightEnd);
