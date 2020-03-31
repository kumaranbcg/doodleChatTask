/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/groups', require('./api/group'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/chats', require('./api/chat'));
  app.use('/auth', require('./auth'));
  

};
