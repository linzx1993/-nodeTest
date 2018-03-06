/**
 * Created by linzx on 2018/3/5.
 */
const fs = require("fs");
fs.open("./1.txt","r+",function (err,fd) {
    // let bf = new Buffer(10);
    // fs.read(fd,bf,0,4,null,function (err,len,newBf) {
    //     console.log(bf);
    // });
    let bf = new Buffer("1234");

    // fs.write(fd,bf,0,3,0,function () {
    //     console.log(arguments);
    // })

    fs.write(fd,"fdsdfs","utf-8",function () {
        console.log(arguments);
    })

    fs.close(fd,function () {
        
    })
})