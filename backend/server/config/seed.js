/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Group = require('../api/group/group.model');
var User = require('../api/user/user.model');

// Insert seed data below
var groupSeed = require('../api/group/group.seed.json');

// Insert seed inserts below
Group.find({}).remove(function() {
	Group.create(groupSeed);
});
