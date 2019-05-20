const dayjs = require('dayjs');
const path = require('path');
const configer = require(path.resolve('tools/configer'));
const apiConfig = require(path.resolve('config/api.config'));


const orig = 0;//自行设定起始时间点
const start = time(orig);
if (start.format('HH:mm:ss') == apiConfig.web.dayRequestStart) { return }
const end = time(orig).add(12, 'hour');
const unit = 3;

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

// const rule = 'YYYY-MM-DD HH:mm:ss';
const rule = undefined;

const dayStart = start.subtract(unit, 'hour').format(rule);
const dayEnd = end.add(unit, 'hour').format(rule);

const nightStart = end.subtract(unit, 'hour').format(rule);
const nightEnd = start.add(1, 'day').add(unit, 'hour').format(rule);

// console.log('\n')

// console.log(dayjs().isAfter(nightStart) && dayjs().isBefore(nightEnd));

// console.log('\n')


apiConfig.groupMembers.DAY.start = dayStart;
apiConfig.groupMembers.DAY.end = dayEnd;
apiConfig.groupMembers.NIGHT.start = nightStart;
apiConfig.groupMembers.NIGHT.end = nightEnd;
apiConfig.web.dayRequestStart = start.format('HH:mm:ss');
