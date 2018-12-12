const fs = require('fs');

const dbConnection = require('./db_connection');

const buildFile = fs.readFileSync(`${__dirname}/db_build.sql`, 'utf8');

dbConnection.query(buildFile, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('Failed', error);
  } else {
    // eslint-disable-next-line no-console
    console.log('Success!');
  }
});
