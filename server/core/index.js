
    const chalk = require('chalk');
    const path = require('path');
    const checkLocalServer = require(path.resolve('server/utils/check_local_server'));
    const AV = require('./lc_server_init');//加载leancloud
    const app = require('./app');//加载 express app
    var net = require('net');
    const developing = process.env.LEANCLOUD_APP_ENV == "development";
    // 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
    // LeanEngine 运行时会分配端口并赋值到该变量。




    var devPort = require(path.resolve('config/api.config.js')).server.devPort;

    var PORT = parseInt(developing ? devPort : (process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000));

    testPort(PORT);

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

                    require('./rotate')//进行判断本台机器是属于leancloud众多机器中的哪一台

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











