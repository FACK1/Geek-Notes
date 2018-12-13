const dbConnection = require('../database/db_connection');

const getNotesByUserId = (id, cb) => {
  const getNotesQuery = 'SELECT * FROM notes WHERE user_id = $1';
  dbConnection.query(getNotesQuery, [id], (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result);
    }
  });
};

module.exports = { getNotesByUserId };
