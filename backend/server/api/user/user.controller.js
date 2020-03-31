'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) { 
     if(err && err.code === 11000) {
      return res.status(200).send({message: "Email Already Exists "})
     } else {
      return res.status(400).send({message: 'something went wrong'})
     }
    }
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn:  60*60*5 });
    return res.json({ token: token });
  });
};

/**
 * Get all user
 */
exports.allUser = function (req, res, next) {
  User.find({role:'user'},function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
