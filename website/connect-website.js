/**
 * Created by linzx on 2017/3/2.
 */
var connect = require("connect");

var server = connect.createServer();

//处理静态文件
server.use(connect.static(__dirname + "/website"));
server.listen(3000);

