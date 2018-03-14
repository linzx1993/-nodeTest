/**
 * Created by linzx on 2018/3/9.
 */
let sqlite = require("sqlite3")

let db = new sqlite.Database(__dirname + '/people.db');

exports.create = () => {
    db.serialize(function () {
        db.run("CREATE TABLE people (id init,name vachar(10),info TEXT)");

        let stmt = db.prepare("INSERT INTO people VALUES (?,?,?)");
        for(let i = 0;i < 10;i++){
            stmt.run(i,"lili" + i,"Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT * FROM people",function (err, row) {
            if(err){

            }else{
                console.log(row)
            }
        })

        db.close();
    })
}

exports.all = () => {
    db.serialize(function () {
        db.all("select * from people",function (err, row) {
            if(err){

            } else {
                console.log(row);
            }
        })
        db.close()
    })
}

exports.get = function (id,ck) {
    db.each("select * from people where id=" + id,function (err, row) {
        if(err){

        }else {
            ck(row)
        }
    })
    db.close();
}

exports.update = function (id, val) {
    db.run("update people set info= ? where id = ?",[val,id],function (err, result) {
        console.log(err)
        console.log(result)
    })
}

exports.delete = function (id, callback) {
    db.run("DELETE FROM people WHERE id = ?",[id],function (err) {
        if(err){
            callback(err)
        } else {
            callback(null)
        }
    })
}