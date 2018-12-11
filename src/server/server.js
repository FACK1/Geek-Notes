// -- required --------------------------
const http = require('http');
const PORT = process.env.PORT || 3000;
const router = require('./router.js');

// -- create the server -----------------
const server = http.createServer(router);

server.listen(PORT, () => {
    console.log("Server is listen to port 3000. Ready to accept requests!")
});
