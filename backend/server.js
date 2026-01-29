const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const dbConfig = {
  host: "mysql",
  user: "root",
  password: "",
  database: "appdb"
};

let db;

function connectWithRetry() {
  db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.log("MySQL not ready... retrying in 5 seconds");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("✅ Connected to MySQL");
    }
  });
}

connectWithRetry();

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("🚀 Backend running on port 3000");
});
