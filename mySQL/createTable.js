var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "mydb"
});

// ================== CREATE TABLE =======================
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var tblName = "guitars";
//   var sql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INT AUTO_INCREMENT PRIMARY KEY, 
//   brand VARCHAR(50), model VARCHAR(50))`;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(`Table Created: ${tblName}`);
//   })
// });


// ================== INSERT =======================
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = `INSERT INTO guitars (brand, model) VALUES ('Fender', 'Strat')`;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log('Record(s) Inserted ' + result.affectedRows);
//   })
// });

// ================== SELECT =======================
con.connect((err) => {
  var sql = "UPDATE guitars SET model = 'Stratocaster' WHERE model = 'Strat'";
  if (err) throw err;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});


// ================== SELECT =======================
con.connect((err) => {
  if (err) throw err;
  con.query("SELECT * FROM guitars WHERE brand LIKE '%en%'", (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
});
