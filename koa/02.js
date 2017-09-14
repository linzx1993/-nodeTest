/**
 * Created by linzx on 2017/9/13.
 */
const fs = require("fs");
const koa = require("koa")
const app = new koa();
const main = function (ctx) {
    ctx.response.type = "html";
    ctx.response.body = fs.createReadStream("./demo/template.html")
}

app.use(main);
app.listen(3000);