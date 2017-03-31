/**
 * Created by linzx on 2017/3/5.
 */
var connect = require("connect"),
    time = require("./request-time");
var server = connect.createServer().listen(3000);
//记录请求情况
server.use(connect.logger("dev"));
//实现时间中间件
server.use(time({time:500}));
//实现快速响应
server.use(function (req, res, next) {
    if("/a" == req.url){
        res.writeHead(200);
        res.end("Fast");
    }else{
        next();
    }
});
//实现慢速响应
server.use(function (req, res, next) {
    if("/b" == req.url){
        setTimeout(function () {
            res.writeHead(200);
            res.end("Slow");
        },1000)
    }else{
        next( )
    }
});