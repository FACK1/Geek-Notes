const dbConnection = require('../database/db_connection');

const getUserByUsername = (username, cb) => {
  const getPasswordQuery = 'SELECT id, password FROM users WHERE username = $1;';
  dbConnection.query(getPasswordQuery, [username], (err, result) => {
    if (err) {
      cb(err);
    } else {
      //console.log(result);
      cb(null, result.rows[0]);
    }
  });
};

module.exports = { getUserByUsername };
