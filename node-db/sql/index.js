/**
 * Created by linzx on 2018/3/9.
 */
let sqlite = require("sqlite3")

let db = new sqlite.Database(__dirname + '/people.db');

sqlite.create()