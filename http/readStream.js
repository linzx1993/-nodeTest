/**
 * Created by yiend on 2017/2/20.
 */
// var http = require("http");
// var fs = require("fs");
// http.createServer(function(req,res){
//    res.writeHead(200,{"Content-Head" : "image/png"});
//    var stream = fs.createReadStream("image.png");
//    stream.on("data",function(data){
//        res.write(data);
//    });
//     stream.on("end",function(){
//         res.end();
//     })
// }).listen(3000);
require("http").createServer(function(req,res){
    console.log(req.headers);
    res.writeHead(200,{"Contnet-Head" : "image/png"});
    require("fs").createReadStream("image.png").pipe(res);
}).listen(3000);