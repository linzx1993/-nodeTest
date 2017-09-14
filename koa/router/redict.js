/**
 * Created by linzx on 2017/9/13.
 */
const koa = require('koa');
const route = require("koa-route");
const path = require("path");

const app = new koa();

const redirect = ctx => {
    ctx.response.redirect("/");
}

const main = ctx => {
    ctx.response.body = "hello world";
}

app.use(route.get("/",main));
app.use(route.get("/redirect",redirect));

app.use(main);
app.listen(3000);