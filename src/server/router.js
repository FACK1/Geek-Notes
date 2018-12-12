//-- Import Modules
const handlers = require('./handlers.js');

// Create Router
const router = (request, response)=> {

// Home Endpoint
  if (request.url === '/') {
    handlers.homeHandler(request,response)
  }
// Public Side Endpoint
  else if (request.url.split('.')[1]) {
    handlers.publicHandler(request,response)
  }
// Error Endpoint
  else {
    handlers.errorHandler(request,response)
  }

};
module.exports = router
