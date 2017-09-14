/**
 * Created by linzx on 2017/9/14.
 */
const Koa = require('koa');
const app = new Koa();

const main = function (ctx) {
    ctx.throw(500);
};

const handle = async (ctx,next) => {
    try{
        await next()
    }catch (err){
        ctx.response.status = err.statusCode ||err.status || 500;
        ctx.response.type = "html";
        ctx.response.body = "<p>something is wrong</p>"
        ctx.app.emit("error",err,ctx)
    }
};

// app.use(handle);
app.use(main);

app.on("error",(err) => {
    console.log("error message",err.message);
    console.error("server error",err);
});

app.listen(3000);