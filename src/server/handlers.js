// -- required --------------------------
const path = require('path');
const fs = require('fs');
const queryString = require('querystring');
const bcrypt = require('bcrypt');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const getData = require('../queries/getData');
const setData = require('../queries/setData');
require('env2')('config.env');

const { SECRET } = process.env;

// -- Error 404 -------------------------
const errorHandler = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end('<h1>Page Not Found : Error 404</h1>');
};

// -- Error 500 -------------------------
const serverErrorHandler = (request, response) => {
  response.writeHead(500, { 'Content-Type': 'text/html' });
  response.end('<h1> Server Error : Error 500 </h1>');
};
// -- Error 403 -------------------------

const forbiddenError = (request, response) => {
  response.writeHead(403, { 'Content-Type': 'text/html' });
  response.end('<h1>Forbidden, You are not authenticated!</h1>');
};

// -- Home Handler ----------------------
const homeHandler = (request, response) => {
  if ((request.headers.cookie)) {
    const token = (cookie.parse(request.headers.cookie)).id;
    jwt.verify(token, SECRET, (err, id) => { // eslint-disable-line no-unused-vars
      if (err) {
        forbiddenError(request, response);
      } else { // TODO: check if that the user is in the DB (if statement).
        const htmlPath = path.join(__dirname, '..', '..', 'public', 'index.html');
        fs.readFile(htmlPath, (error, file) => {
          if (error) {
            serverErrorHandler(request, response);
          } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(file);
          }
        });
      }
    });
  } else {
    response.writeHead(302, { Location: '/auth.html' });
    response.end('Not Authneticated, Redirecting to registration page!');
  }
};

// -- Auth Handler ----------------------
const authHandler = (request, response) => {
  const htmlPath = path.join(__dirname, '..', '..', 'public', 'auth.html');
  fs.readFile(htmlPath, (error, file) => {
    if (error) {
      serverErrorHandler(request, response);
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  });
};

// -- public Handler --------------------
const publicHandler = (request, response) => {
  const extention = request.url.split('.')[1];
  const contentTypeMapping = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/js',
    jpg: 'image',
    ico: 'image/x-icon',
  };
  if (!contentTypeMapping[extention]) {
    errorHandler(request, response);
  } else {
    const filePath = path.join(__dirname, '..', '..', 'public', request.url);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        errorHandler(request, response);
      }
      response.writeHead(200, { 'Content-Type': contentTypeMapping[extention] });
      response.end(file);
    });
  }
};

// -- Register Handler --------------------
const registerHandler = (request, response) => {
  let body = '';
  request.on('data', (data) => {
    body += data.toString();
  });
  request.on('end', () => {
    const { name, username, password } = queryString.parse(body);
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        serverErrorHandler(request, response);
      }
      bcrypt.hash(password, salt, (hashErr, hash) => {
        if (hashErr) {
          serverErrorHandler(request, response);
        }
        setData.setUser(name, username, hash, (error, id) => {
          if (error) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end('<h1>Registration Error</h1>');
          } else {
            jwt.sign(id, SECRET, (signErr, token) => {
              console.log(token);
              response.writeHead(302, {
                'Set-Cookie': `id=${token}; Max-Age=9000;`,
                Location: '/',
              });
              response.end('Redirecting...');
            });
          }
        });
      });
    });
  });
};

// -- LogIn Handler --------------------

const loginHandler = (request, response) => {
  let body = '';
  request.on('data', (data) => {
    body += data.toString();
  });
  request.on('end', () => {
    const { username, password } = queryString.parse(body);
    getData.getUserByUsername(username, (err, user) => {
      if (err) {
        forbiddenError(request, response);
      } else {
        bcrypt.compare(password, user.password, (cryptErr, res) => {
          if (cryptErr) {
            serverErrorHandler(request, response);
          } else if (res) {
            console.log(user.id.toString());
            jwt.sign({id: user.id}, SECRET, (signErr, token) => {
              console.log("RESULT NOT TRUE ", signErr);
              response.writeHead(302, {
                'Set-Cookie': `id=${token}; Max-Age=9000;`,
                Location: '/',
              });
              response.end();
            });
          } else {
            forbiddenError(request, response);
          }
        });
      }
    });
  });
};

// -- Export handlers -------------------
module.exports = {
  errorHandler,
  serverErrorHandler,
  homeHandler,
  authHandler,
  publicHandler,
  registerHandler,
  forbiddenError,
  loginHandler,
};
