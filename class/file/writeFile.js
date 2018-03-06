/**
 * Created by linzx on 2018/3/5.
 */
const fs = require("fs");

let fileName = "2.txt";

// fs.writeFile(fileName,"1234",function () {
//     console.log(arguments);
// })
//
// fs.appendFile(fileName,"1234",function () {
//     console.log(arguments);
// })

// fs.exists(fileName,function (isExists) {
//     if(isExists){
//         fs.appendFile(fileName,"-leo",function (err) {
//             if(err){
//                 console.log("新内容添加失败")
//             }else{
//                 console.log("新内容添加成功")
//             }
//         })
//     }else {
//         fs.writeFile(fileName,"new",function (err) {
//             if(err){
//                 console.log("创建文件失败")
//             }else{
//                 console.log("创建文件成功")
//                 // fs.unlink("2.txt",function (err) {
//                 //     console.log("!2312321321");
//                 // })
//
//                 fs.rename("2.txt","2.mew.txt",function () {
//
//                 })
//             }
//         })
//     }
//
// })

// fs.watch("2.mew.txt",function (event, fn) {
//     console.log(event)
//
//     if(fn){
//         console.log(fn)
//     }
// })

fs.stat("1.txt",function () {
    console.log(arguments)
})