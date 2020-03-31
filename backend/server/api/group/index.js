'use strict';

var express = require('express');
var controller = require('./group.controller');
var auth = require('../../auth/auth.service')
var router = express.Router();

router.get('/:id', controller.show); // To get user group 
router.post('/', controller.create); // To create group

module.exports = router;