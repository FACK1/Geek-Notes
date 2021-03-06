// -- Import Modules
const handlers = require('./handlers.js');

// Create Router
const router = (request, response) => {
  if (request.url === '/') {
    // Home Endpoint
    handlers.homeHandler(request, response);
  } else if (request.url.split('.')[1]) {
    // Public Side Endpoint
    handlers.publicHandler(request, response);
  } else if (request.url === '/register' && request.method === 'POST') {
    // Register Handler
    handlers.registerHandler(request, response);
  } else if (request.url === '/login' && request.method === 'POST') {
    // Login Handler
    handlers.loginHandler(request, response);
  } else {
    // Error Endpoint
    handlers.errorHandler(request, response);
  }
};
module.exports = router;
