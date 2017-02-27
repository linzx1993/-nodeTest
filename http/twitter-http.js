/**
 * Created by yiend on 2017/2/14.
 */
var http = require("http"),qs = require("querystring");
var search = process.argv.slice(2).join("").trim();
console.log(process.argv);
if(!search.length){
    return console.log("\n Usage:node tweets <search term>\n");
}

console.log("\n searching for: \033[96m" + search + "\033[39m\n");

http.request({
    host : 'www.google.com',
    path : "/search.json?" + qs.stringify({q : search}),function(res){
        var body = "";
        res.setEncoding("utf8")
        res.on("data",function(chunk){
            body += chunk;
        })
        res.on("end",function () {
            var obj = JSON.parse(body);
            obj.results.forEach(function (tweet) {
                console.log("   \033[90m" + tweet.text + "\033[39m");
                console.log("   \033[94m" + tweet.from_user+ "\033[39m");
                console.log("--");
            })
        }).end();
    }
});
http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type" : " text/HTML"});
    res.write("<h1>hello world</h1>");
    setTimeout(function () {
        res.end("world")
    },500)
}).listen(3000);