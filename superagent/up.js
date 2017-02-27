/**
 * Created by linzx on 2017/2/27.
 */
module.exports = require("http").createServer(function (req,res) {
    res.writeHead(200,{"content-type" : "text/html"});
    res.end("Hello<b>world</b>")
})
