/**
 * Created by linzx on 2017/9/14.
 */
const Koa = require('koa');
const app = new Koa();
const koaBody = require("koa-body");

const main = async function (ctx) {
    const body = ctx.response.body;
    if(!body.name) ctx.throw(400,"name is require");
    ctx.body = {name : body.name};
}

// app.use(main2);
// app.use(koaBody());

const os = require("os");
const fs = require("fs");
const path = require("path");

const main2 = function (ctx) {
    const tmpdir = os.tmpdir();
    const filePaths = [];
    console.log(ctx.request);
    const files = ctx.request.body.files || {};

    for(let key in files){
        const file = files[key];
        const filePath = path.join(tmpdir,file.name);
        const reader = fs.createReadStream(file.path);
        const write = fs.createWriteStream(filePath);
        reader.pipe(write);
        filePath.push(filePath)
    }
    ctx.body = filePaths;
};

app.use(main2);
app.use(koaBody({multipart : true}));
app.listen(3000);