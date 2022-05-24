const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// this is a top-level await
// you would have to import / invoke this in another file
module.exports =  async function sqlite () {
  return open({
    filename: '../mySqlite100.db',
    driver: sqlite3.Database
  })
}