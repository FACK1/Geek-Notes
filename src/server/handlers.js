// -- required --------------------------
const path = require('path');
const fs = require('fs');
const queryString = require('querystring');
const bcrypt = require('bcrypt');
const setData = require('../queries/setData');


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

// -- Home Handler ----------------------
const homeHandler = (request, response) => {
  const htmlPath = path.join(__dirname, '..', '..', 'public', 'index.html');
  fs.readFile(htmlPath, (error, file) => {
    if (error) {
      serverErrorHandler(request, response);
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  });
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
    body += data.toSrting();
  });
  request.on('end', () => {
    const { name, uesrname, password } = queryString.parse(body);
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        serverErrorHandler(request, response);
      }
      bcrypt.hash(password, salt, (hashErr, hash) => {
        if (hashErr) {
          serverErrorHandler(request, response);
        }
        setData.setUser(name, uesrname, hash, (error) => {
          if (error) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end('<h1>Registration Error</h1>');
          } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('<h1>Registered Successfully!');
          }
        });
      });
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
};
