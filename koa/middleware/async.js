const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
const compose = require("koa-compose");

const logger = (ctx,next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next();
}
const main = function (ctx, next) {
    ctx.response.body = "hello world";
};

const middleWares = compose([logger,main]);

app.use(middleWares);
app.listen(3000);