/**
 * Created by yiend on 2017/2/20.
 */
require("http").createServer(function (req,res) {
    if("/" == req.url){
        res.writeHead(200,{"content-type" : "text/html"})
        res.end([
            "<form method='post' action='/url'>",
            "<h1>My form</h1>",
            "<fieledset>",
            "<label>my person imformation</label>",
            "<p>what is your name</p>",
            //input需要加上name属性，这样子input才能提交input的数据，
            "<input type='text' name='name'/>",
            "<p><button>submit</button></p>",
            "<form>"
        ].join(""))
    }else if("/url" == req.url && "POST" == req.method){
        var body = "";
        req.on("data",function(chunk){
            body += chunk;
            console.log(123+body);
        });
        req.on("end",function(){
            res.writeHead(200,{"content-type" : "text/html"});
            res.end("<p>your name is</p>" + "<p>"+ require("querystring").parse(body).name + "</p>")
        });
    }else{
        res.writeHead(404);
        res.end("NOT Found");
    }
}).listen(3000);
