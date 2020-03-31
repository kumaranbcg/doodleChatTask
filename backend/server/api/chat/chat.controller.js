'use strict';

var config = require('../../config/environment');
var socketio=require('socket.io-client')(config.backendurl)
var Chat = require('./chat.model');

// To get chats in the DB.
exports.getChat = function(req, res) {
  console.log("user",req.user._id)
  console.log("params",req.params.id)
  Chat.find({
    $or: [
      {
        $and: [
          { recieverid: req.user._id },
          { senderid: req.params.id }
        ]
      },
      {
        $and: [
          { recieverid: req.params.id },
          { senderid: req.user._id }
        ]
      },
      {
        groupid: req.params.id
      },
  ]
  }).populate('senderid').populate('recieverid').populate('groupid').exec(function(err, chat) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(chat);
    });
  };

// Creates a new chat in the DB.
exports.create = function(req, res) {
  req.body.senderid = req.user._id;
  Chat.create(req.body,function(err, chat) {
    if(err) { return handleError(res, err); }
    Chat.findById(chat._id).populate('senderid').populate('recieverid').populate('groupid').exec(function(err,chatdata){
      socketio.emit('chat:save', chatdata)
      return res.status(201).json(chatdata);
    })
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}