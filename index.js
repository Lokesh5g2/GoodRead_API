const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const app = express();
const dbPath = path.join(__dirname, "goodreads.db");
const { open } = require("sqlite");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => console.log("server running"));
  } catch (e) {
    process.exit;
  }
};

initializeDBAndServer();

app.get("/books/", async (req, res) => {
  const getBooksQuery = `SELECT * from book order by book_id`;
  const booksArray = await db.all(getBooksQuery);
  res.send(booksArray);
});
