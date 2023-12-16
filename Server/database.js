const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "1234",
    database: "ctp_database",
});
module.exports = db;