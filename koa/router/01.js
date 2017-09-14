const Koa = require('koa');
const route = require("koa-route");
const path = require("path");
const serve = require("koa-static");


const app = new Koa();

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
};


// const main = ctx => {
//     ctx.response.body = "hello world";
// }
const main = serve(path.join(__dirname));

// app.use(route.get("/",main));
app.use(main);
app.use(route.get("/about",about));
app.listen(3000);