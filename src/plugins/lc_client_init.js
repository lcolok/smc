import AV from 'leancloud-storage';
const apiConfig = require('../../config/api.config');
// import current_app_id from '!raw-loader!../../.leancloud/current_app_id';
// import current_app_key from '!raw-loader!../../.leancloud/current_app_key';

// console.log(process.env);

AV.init({
	appId: 'tSaaSytepnN8bI2MQ1ubO68s-gzGzoHsz',
	appKey: 'hpdGl56rjXKR0DvGMKypVpwk',
});

if (process.env.NODE_ENV == 'development') {
	//如果是处于开发状态的话

	const apiConfigDevPort = 3000;
	const devServerURLs = 'http://localhost:' + apiConfigDevPort;

	const origServerURLs = AV._config.serverURLs; //原来的远程服务器url

	function devPort(bool) {
		if (process.env.NODE_ENV !== 'development') {
			return;
		}
		if (bool) {
			console.log('本地⮕远程');
			AV._setServerURLs(devServerURLs); //设置本地服务器端口(必须先进行 lean up 操作)
		} else {
			console.log('本地⬅远程');
			AV._setServerURLs(origServerURLs);
		}
	}

	function Promise(fn) {
		var state = 'pending',
			value = null,
			callbacks = [];

		if (state === 'pending') {
			devPort(true);
		}

		this.then = function(onFulfilled, onRejected) {
			return new Promise(function(resolve, reject) {
				handle({
					onFulfilled: onFulfilled || null,
					onRejected: onRejected || null,
					resolve: resolve,
					reject: reject,
				});
			});
		};

		function handle(callback) {
			if (state === 'pending') {
				callbacks.push(callback);
				return;
			}
			var cb =
					state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
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
			if (
				newValue &&
				(typeof newValue === 'object' || typeof newValue === 'function')
			) {
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
			setTimeout(function() {
				if (state === 'fulfilled' || state === 'rejected') {
					devPort(false);
				}
				callbacks.forEach(function(callback) {
					handle(callback);
				});
			}, 0);
		}

		fn(resolve, reject);
	}

	const middle = AV.Cloud.run; //过渡产物

	AV.Cloud.run = function(name, data, option) {
		return new Promise((resolve, reject) => {
			resolve(middle(name, data, option).catch(e => reject(e)));
		});
	};
}

export default AV;
