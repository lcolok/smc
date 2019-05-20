const dayjs = require('dayjs');

// const orig = '03:00';

// Date.prototype.Format = function (fmt) { //author: meizz
//         var o = {
//                 "M+": this.getMonth() + 1, //月份
//                 "d+": this.getDate(), //日
//                 "h+": this.getHours(), //小时
//                 "m+": this.getMinutes(), //分
//                 "s+": this.getSeconds(), //秒
//                 "q+": Math.floor((this.getMonth() + 3) / 3), //季度
//                 "S": this.getMilliseconds() //毫秒
//         };
//         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//         for (var k in o)
//                 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//         return fmt;
// }






const orig = 0;
const start = time(orig);
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


console.log('\n')
const dayStart = start.subtract(unit, 'hour');
const dayEnd = end.add(unit, 'hour');

const nightStart = end.subtract(unit, 'hour');
const nightEnd = start.add(1, 'day').add(unit, 'hour');


console.log(nightEnd.format('YYYY-MM-DD hh:mm:ss'));

console.log(dayjs().isAfter(time(start)) && dayjs().isBefore(end));

console.log('\n')
