const dbConnection = require('../database/db_connection');

const setUser = (name, username, password, cb) => {
  const setUserQuery = "INSERT INTO users (name, username, password) VALUES ($1, $2, $3);"
  dbConnection.query(setUserQuery,[name, username, password],(error) => {
  if (error){
    cb(error);
  } else {
    cb(null);
  }
});
};
module.exports = {setUser};
