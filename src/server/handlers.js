// -- required --------------------------
const path = require('path');
const fs = require('fs');


// -- Error 404 -------------------------
const errorHandler = (request, response) => {
    response.writeHead(404, {'Content-Type' : 'text/html'});
    response.end('<h1>Page Not Found : Error 404</h1>');
};

// -- Error 500 -------------------------
const serverHandler = (request, response) => {
    response.writeHead(505, {'Content-Type' : 'text/html'});
    response.end('<h1> Server Error : Error 500 </h1>');
};

// -- Home Handler ----------------------
const homeHandler = (request, response) => {
    const htmlPath = path.join(__dirname, '..', '..', 'public', 'index.html');
    fs.readFile(htmlPath, (error, htmlPath) => {
        if(error){
            serverHandler();
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
            serverHandler();
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
        jpg  : 'image'
    };
    if(!contentTypeMapping[extention]){
        errorHandler();
    } else {
        const filePath = path.join(__dirname, '..', '..', 'public', request.url);
        fs.readFile(filePath, (error, file) => {
            if(error){
                serverHandler();
            }
            response.writeHead(200, {'Content-Type' : contentTypeMapping[extention]});
            response.end(file);
        });
    };
};