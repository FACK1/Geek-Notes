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
  } else {
    // Error Endpoint
    handlers.errorHandler(request, response);
  }
};
module.exports = router;
