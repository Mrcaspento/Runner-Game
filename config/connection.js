const mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "gingerbreadMan_db"
  });
}

connection.connect(function(err) {
  if (err) {
    console.error("error connection: " + err.stack);
    return;
  }
});

module.exports = connection;
