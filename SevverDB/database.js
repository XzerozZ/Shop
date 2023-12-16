const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "css222",
    database: "webpro",
});
module.exports = db;