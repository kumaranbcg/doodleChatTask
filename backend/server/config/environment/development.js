'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb+srv://kumaran:PassworD@mycluster-dbal3.mongodb.net/chatdb?retryWrites=true&w=majority'
  },
  backendurl: 'http://localhost:9000',
  seedDB: false
};
