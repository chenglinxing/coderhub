const mysql = require("mysql2");

const config = require("./config");

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});


//测试数据是否连接成功
connections.getConnection((err, conn) => {
  conn.connect((cerr) => {
    if (cerr) {
      console.log("数据库连接失败：", err);
    } else {
      console.log("数据库连接成功：");
    }
  });
});


module.exports = connections.promise()