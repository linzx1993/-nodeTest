/**
 * Created by linzx on 2018/3/6.
 */
let fs = require("fs");

let filedir = "./linzx/source";

fs.watch(filedir,function (ev, name) {
    fs.readdir(filedir,function (err,dataList) {
        let arr = [];

        dataList.forEach(function (f) {
            if(!f) return;
            let info = fs.statSync(filedir + "/" + f);

            if(info.mode === 33206){
                arr.push(filedir + "/" + f);
            }
        })
        console.log(arr);

        let content = "";

        arr.forEach(f => {
            let c = fs.readFileSync(f);
            console.log(c);
            content += c.toString() + "\n";
        })

        console.log(content);

        fs.writeFile("./linzx/js/index.js",content);
    })
})