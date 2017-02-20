/**
 * Created by yiend on 2017/2/14.
 */
var http = require("http");
http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type" : " text/HTML"});
    res.write("<h1>hello world</h1>");
    setTimeout(function () {
        res.end("world")
    },500)
}).listen(3000);