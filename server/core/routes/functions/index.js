'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var axios = require('axios');
var iconv = require("iconv-lite");

axios.interceptors.request.use(function (config) {

    config.metadata = { startTime: new Date() }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    return response;
}, function (error) {
    error.config.metadata.endTime = new Date();
    error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
});

// express的redirect功能
router.get('/baidu', function (req, res, next) {
    res.redirect('https://www.baidu.com')
});

router.get('/su', function (req, res, next) {
    let params = req.query;
    params.action = 'opensearch'//增加此句会让服务器返回数组

    axios.get('http://www.baidu.com/su', {
        params: params,
        responseType: 'arraybuffer',//这是起到决定性的作用
        transformResponse: [function (data) {
            data = iconv.decode(data, 'gbk');

            return data
        }]
    })
        .then(function (response) {
            // console.log(response);
            res.json({ data: response.data, duration: response.duration });
        })
        .catch(function (error) {
            console.log(error);
        });
});


// 新增 Todo 项目
router.post('/', function (req, res, next) {
    var content = req.body.content;
    var todo = new Todo();
    todo.set('content', content);
    todo.save().then(function (todo) {
        res.redirect('./views/todos');
    }).catch(next);
});

module.exports = router;
