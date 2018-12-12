const dbConnection = require('../database/db_connection');

const setUser = (name, username, password, cb) => {
  const setUserQuery = "INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING id;"
  dbConnection.query(setUserQuery,[name, username, password],(error, result) => {
  if (error){
    cb(error);
  } else {
    cb(null, result.rows[0]);
    console.log(result);
  }
});
};
module.exports = { setUser };
