const dayjs = require('dayjs');

module.exports = function (t) {
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
