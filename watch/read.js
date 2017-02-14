/**
 * Created by yiend on 2017/2/14.
 */
var fs = require("fs");
var stream = fs.createReadStream("aaa.txt");
var files = fs.readdirSync(process.cwd());
files.forEach(function(file){
    console.log(file);
    if(/\.css$/.test(file)){
        fs.watchFile(process.cwd() + "/" + file,function(){
            console.log(" - " + file + ' changed!');
        })
    }
})
stream.on("data",function(chunk){
    console.log(chunk)
});
stream.on("end",function(chunk){
    console.log(chunk)
});
// fs.readFile("aaa.txt",function(err,data){
//     "use strict";
//     console.log(data);
// });