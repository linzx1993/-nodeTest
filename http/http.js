/**
 * Created by yiend on 2017/2/14.
 */
var http = require("http");
http.createServer(function(req,res){
    res.writeHead(200,{"content-type" : "text/html"});
    res.end("<h1>hello world</h1>");
}).listen(3000);