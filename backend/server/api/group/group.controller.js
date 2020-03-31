'use strict';

var Group = require('./group.model');

// Get a single group
exports.show = function(req, res) {
  Group.find({'users._id': req.params.id}, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.status(404).send('Not Found'); }
    return res.json(group);
  });
};

// Creates a new group in the DB.
exports.create = function(req, res) {
  Group.create(req.body, function(err, group) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(group);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}