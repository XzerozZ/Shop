import * as mysql from 'mysql2';

const dbConnect = () => {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "css222",
    database: "webpro",
    connectionLimit: 20000000
  }).promise();

  return pool;
}

export { dbConnect };