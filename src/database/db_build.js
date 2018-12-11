const fs = require('fs');

const db_connection = require("./db_connection")
const buildFile = fs.readFileSync(__dirname + "/db_build.sql", "utf8");

  db_connection.query(buildFile, (error, result)=>{
    if (error) {
      console.log("Failed", error);
    }else {
      console.log("Success!");
    }
  });
