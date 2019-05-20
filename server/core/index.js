// require('./rotate_init')//用于周期测试
// const AV = require('./lc_server_init');//加载leancloud
require('./init')
const chalk = require('chalk');
const path = require('path');
const checkLocalServer = require(path.resolve('server/utils/check_local_server'));
const app = require('./app');//加载 express app
const net = require('net');
const developing = process.env.LEANCLOUD_APP_ENV == "development";
// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。

const checkServers = require(path.resolve('server/utils/check_servers'));
const apiConfig = require(path.resolve('config/api.config.js'));


checkServers().then(e => {//进行判断本台机器是属于leancloud众多机器中的哪一台
    // console.log(e);
    let memberName = e.currentApp.split('@').pop();
    const devPort = apiConfig.groupMembers[memberName].devPort;
    const PORT = parseInt(developing ? devPort : (process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000));
    testPort(PORT);
})



function testPort(port) {

    // 创建服务并监听该端口
    var server = net.createServer().listen(port)

    server.on('listening', function () { // 执行这块代码说明端口未被占用
        server.close() // 关闭服务
        // console.log('The port【' + port + '】 is available.') // 控制台输出信息
        listen(port);
    })

    server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') { // 端口已经被使用
            // console.log('The port【' + port + '】 is occupied, please change other port.')
            testPort(port + 1);
        }
    })
}




function listen(PORT) {
    const timer = setInterval(() => {
        if ((process.env.PROGRESS_BAR_RUNNING == "false") || !developing) {//只有进度条播放完才会进行以下声明
            app.listen(PORT, function (err) {


                clearInterval(timer);
                console.log(chalk.yellow.inverse(` SERVER READY `) + ' ' + 'Node app is running on', `${chalk.yellow('http://localhost:' + PORT)}`);//启动本服务器
                for (var n = 0; n < 10; n++) {
                    checkLocalServer(8080 + n);//从端口8080开始轮询
                }

                // 注册全局未捕获异常处理器
                process.on('uncaughtException', function (err) {
                    console.error('Caught exception:', err.stack);
                });
                process.on('unhandledRejection', function (reason, p) {
                    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
                });
            });
        }
    }, 0);
}











