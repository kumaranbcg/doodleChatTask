'use strict';

var express = require('express');
var controller = require('./chat.controller');
var auth = require('../../auth/auth.service')
var router = express.Router();

router.get('/getchat/:id', auth.isAuthenticated(), controller.getChat); // To get chat data 
router.post('/', auth.isAuthenticated(), controller.create); // To send message

module.exports = router;