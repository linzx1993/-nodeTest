/**
 * Created by linzx on 2017/3/8.
 */
var connect = require("connect");
var fs = require("fs");
// var server = connect(connect.bodyParser(),connect.static('static'));
connect.createServer(connect.logger("dev"),function (req,res,next){
    if("POST" == req.method && req.body.file){
        fs.readFile(req.body.file.path,"utf8",function (err,data) {
            if(err){
                res.writeHead(500);
                res.end("Error");
                return;
            }
            res.writeHead(200,{"Content-Type" : "text/html"});
            res.end([
                '<h3>File:' + req.body.file.name +'</h3>',
                '<h4>Type:' + req.body.file.type +'</h4>',
                '<h4>Content:' + data +'</h4>',
            ].join(""));
        })
        console.log(req.body.file);
    }else{
        next();
    }
    // res.writeHead(200);
    // res.end("hello world");
}).listen(3000);
