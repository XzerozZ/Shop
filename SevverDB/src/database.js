const mysql = require('mysql2/promise');
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "css222",
    database: "webpro",
});
const connectToDatabase = async () => {
    const connection = await pool.getConnection();
    return connection;
};

module.exports = { connectToDatabase };