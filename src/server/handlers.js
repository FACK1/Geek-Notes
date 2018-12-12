// -- required --------------------------
const path = require('path');
const fs = require('fs');
const setData = require('../queries/setData');
const queryString = require('query-string');


// -- Error 404 -------------------------
const errorHandler = (request, response) => {
    response.writeHead(404, {'Content-Type' : 'text/html'});
    response.end('<h1>Page Not Found : Error 404</h1>');
};

// -- Error 500 -------------------------
const serverErrorHandler = (request, response) => {
    response.writeHead(500, {'Content-Type' : 'text/html'});
    response.end('<h1> Server Error : Error 500 </h1>');
};

// -- Home Handler ----------------------
const homeHandler = (request, response) => {
    const htmlPath = path.join(__dirname, '..', '..', 'public', 'index.html');
    fs.readFile(htmlPath, (error, htmlPath) => {
        if(error){
            serverErrorHandler(request, response);
        }
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(htmlPath);
    });
};

// -- Auth Handler ----------------------
const authHandler = (request, response) => {
    const htmlPath = path.join(__dirname, '..', '..', 'public', 'auth.html');
    fs.readFile(htmlPath, (error, htmlPath) => {
        if(error){
            serverErrorHandler(request, response);
        }
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(htmlPath);
    });
};

// -- public Handler --------------------
const publicHandler = (request, response) => {
    const extention = request.url.split('.')[1];
    const contentTypeMapping = {
        html : 'text/html',
        css  : 'text/css',
        js   : 'application/js',
        jpg  : 'image',
        ico  : 'image/x-icon'
    };
    if(!contentTypeMapping[extention]){
        errorHandler(request, response);
    } else {
        const filePath = path.join(__dirname, '..', '..', 'public', request.url);
        fs.readFile(filePath, (error, file) => {
            if(error){
                errorHandler(request, response);
            }
            response.writeHead(200, {'Content-Type' : contentTypeMapping[extention]});
            response.end(file);
        });
    };
};

// -- Register Handler --------------------
    const registerHandler = (request, response) => {
        let body = "";
        request.on("data", (data) => {
            body += data.toSrting();
        });
        request.on("end", () => {
            let {name, uesrname, password} = queryString.parse(body);
            setData.setUser(name, uesrname, password, error => {
                if(error){
                    response.writeHead(500, {'Content-Type': 'text/html'});
                    response.end('<h1>Registration Error</h1>');
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end('<h1>Registered Successfully!');
                }
            });
        })
    }
    
// -- Export handlers -------------------
module.exports = {
    errorHandler,
    serverErrorHandler,
    homeHandler,
    authHandler,
    publicHandler,
    registerHandler
    }
