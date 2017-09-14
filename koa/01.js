/**
 * Created by linzx on 2017/9/13.
 */
const koa = require("koa");
const fs = require("fs");
const app = new koa();

const main = ctx => {
    if(ctx.request.accepts("xml")){
        ctx.response.type = "xml";
        ctx.response.body = "<data>xml</data>"
    }else if(ctx.request.accepts("json")){
        ctx.response.type = "json";
        ctx.response.body = {data :　"json"};
    }else if(ctx.request.accepts("html")){
        ctx.response.type = "html";
        ctx.response.body = "<p>hello world</p>"
    }else{
        ctx.response.type = "text";
        ctx.response.body = "hello world"
    }
};

app.use(main);

app.listen(3000);