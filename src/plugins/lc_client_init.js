import AV from 'leancloud-storage'
import dayjs from 'dayjs'
const apiConfig = require('../../config/api.config');
// import current_app_id from '!raw-loader!../../.leancloud/current_app_id';
// import current_app_key from '!raw-loader!../../.leancloud/current_app_key';

// console.log(process.env);

const orig = apiConfig.web.dayRequestStart;
const start = time(orig);
const end = time(orig).add(12, 'hour');

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

let dayOrNight = '';

if (dayjs().isAfter(start) && dayjs().isBefore(end)) {
  dayOrNight = "DAY";
} else {
  dayOrNight = "NIGHT";
}

console.log(dayOrNight);

AV.init({
  appId: apiConfig.groupMembers[dayOrNight].app_id,
  appKey: apiConfig.groupMembers[dayOrNight].app_key,
})






if (process.env.NODE_ENV == "development") {//如果是处于开发状态的话


  const apiConfigDevPort = apiConfig.groupMembers.DAY.devPort || 3000;
  const devServerURLs = 'http://localhost:' + apiConfigDevPort;

  AV._config.origServerURLs = AV._config.serverURLs;
  AV._config.devServerURLs = devServerURLs

  function devPort(bool) {
    if (process.env.NODE_ENV !== "development") { return }
    if (bool) {
      console.log('本地⮕远程');
      AV._setServerURLs(AV._config.devServerURLs)//设置本地服务器端口(必须先进行 lean up 操作)
    } else {
      console.log('本地⬅远程');
      AV._setServerURLs(AV._config.origServerURLs)
    }
  }



  function Promise(fn) {

    var state = 'pending',
      value = null,
      callbacks = [];

    if (state === 'pending') {
      devPort(true);
    }

    this.then = function (onFulfilled, onRejected) {
      return new Promise(function (resolve, reject) {
        handle({
          onFulfilled: onFulfilled || null,
          onRejected: onRejected || null,
          resolve: resolve,
          reject: reject
        });
      });
    };

    function handle(callback) {


      if (state === 'pending') {
        callbacks.push(callback);
        return;
      }
      var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
        ret;
      if (cb === null) {
        cb = state === 'fulfilled' ? callback.resolve : callback.reject;
        cb(value);

        return;
      }
      ret = cb(value);
      callback.resolve(ret);
    }

    function resolve(newValue) {
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (typeof then === 'function') {
          then.call(newValue, resolve, reject);
          return;
        }
      }
      state = 'fulfilled';
      value = newValue;
      execute();
    }



    function reject(reason) {
      state = 'rejected';
      value = reason;
      execute();
    }

    function execute() {
      setTimeout(function () {


        if (state === 'fulfilled' || state === 'rejected') {
          devPort(false);
        }
        callbacks.forEach(function (callback) {
          handle(callback);
        });
      }, 0);
    }


    fn(resolve, reject);
  }

  const middle = AV.Cloud.run;//过渡产物

  AV.Cloud.run = function (name, data, option) {
    return new Promise((resolve, reject) => {
      resolve(middle(name, data, option).catch(e => reject(e)))
    })
  }
}


export default AV