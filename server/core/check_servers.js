module.exports = () => {
    const fs = require("fs");
    // console.log('haah');
    const requestJS = require("request");
    requestJS.get(`https://leancloud.cn/1/clients/self/apps`, {
        headers: {
            'Cookie': process.env.lcCookie,
            'X-XSRF-TOKEN': process.env.xsrfToken,
        }
    }, (err, httpResponse, body) => {
        if (!err) {

            const apps = JSON.parse(body);
            // console.log(apps);


            for (var app of apps) {
                app.app_id == process.env.LEANCLOUD_APP_ID ? console.log(app.app_name) : ""
            }
            // fs.writeFileSync("smc.data.json", JSON.stringify(app));


        } else {
            console.log(err);
        }
    })


    const start = 0;

    const end = 24;

    const totalDuration = end - start;

    const n = 3;
    const serverLife = 18;
    const commonDuration = (serverLife * n - totalDuration) / (n + 1);
    const soloDuration = serverLife - 2 * commonDuration;

    let servers = {};

    for (let i = 0; i < n; i++) {//定义第一台机休息时间
        let begin = commonDuration + soloDuration;
        let end = soloDuration + commonDuration * (n - 1) + soloDuration * (n - 1);

        let offset = i * soloDuration + commonDuration * (i == 0 ? 0 : i - 1);

        begin = begin + offset;
        end = end + offset;



        begin = begin >= 24 ? begin % 24 : begin;
        end = end > 24 ? end % 24 : end;

        servers[i] = {
            begin: begin,
            end: end,
        }
    }

    /*     for (let i = 0; i < n; i++) {//定义第一台机活跃时间
            let begin, end;
            if (!(i % 2)) {
                begin = -commonDuration;
    
            } else {
                begin = commonDuration * (i - 1) + soloDuration * (i);
    
            }
            end = begin + serverLife;
    
            servers[i] = {
                begin: begin,
                end: end,
            }
        } */
    console.log('\n');
    console.log(servers);
    console.log("commonDuration", commonDuration);
    console.log("soloDuration", soloDuration);

    console.log(0 % 2);
    console.log(1 % 2);
    console.log(2 % 2);
    console.log(3 % 2);

    console.log('\n');















};