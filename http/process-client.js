/**
 * Created by yiend on 2017/2/20.
 */
var http = require("http"),qs = require("querystring");
function send(theName){
    http.request({
        host : "127.0.0.1",
        port : "3000",
        url : "/",
        method : "POST"
    },function (res) {
        res.setEncoding("utf8");
        res.on("end",function () {
            console.log("\n \033[90m request complete!\033[39m");
        })
    }).end(qs.stringify({name :theName}))
    process.stdout.write("\n your name :");
    process.stdin.resume();
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data",function (name) {
        send(name.replace("\n",""));
    })
}