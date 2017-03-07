/**
 * Created by linzx on 2017/3/7.
 */
var connect = require("connect");
var server = connect.createServer();
server = connect.createServer(connect.logger("type is :res[content-type],length is " + ':res[Content-Length] and it took :response-time ms'),function (req,res) {
    res.writeHead(200);
    res.end("Hello world")
}).listen(3000);
// server.use(connect.logger("type is :res[content-type],length is " + ':res[content-length] and it took :response-time ms'));
connect.logger.token("type",function (req, res) {
    return req.headers["content-type"]
})