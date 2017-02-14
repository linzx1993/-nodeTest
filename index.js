/**
 * Created by yiend on 2017/2/11.
 */
var fs = require("fs"),
    stdin = process.stdin,//指向标准输
    stdout = process.stdout;
// console.log(fs.readdirSync(__dirname));//同步方式
//异步方式
fs.readdir(process.cwd(),function(err,files){
    console.log(files);
    if(!files.length) {return console.log("没有文件")}
    console.log("select files which file or directory you want to see/n");
    var stats = [];
    function file(i){
        var filename = files[i];
        fs.stat(__dirname + "/" + filename,function (err, stat) {
            stats[i] = stat;
            if(stat.isDirectory()){
                console.log('  ' + i + '\033[36m' + filename +'\033[39m');//\033[39m和\033[36m显示颜色
            }else{
                console.log('  ' + i + '\033[90m' + filename +'\033[39m');
            }
            if(++i == files.length){
                read();
            }else{
                file(i);
            }
        })
    }
    function read(){
        stdin.on("data",option);
    }
    function option(data){
        var filename = stats[Number(data)];

        if(filename.isDirectory()){
            console.log(" ");
            console.log("   (" + files.length + " files)");
            files.forEach(function(file){
                console.log("   -   " + file);
            });
            console.log(" ");
        }else{
            fs.readFile(__dirname + "/" +filename,'utf8',function(err,data){
                console.log("\033[90m" + data.replace(/(.*)/g,'  $1') + '\033[39m');
            })
        }
    }
    file(0);
});