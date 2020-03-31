'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatSchema = new Schema({
  message: String,
  senderid: { type: Schema.Types.ObjectId, ref: "User" },
  recieverid: { type: Schema.Types.ObjectId, ref: "User" },
  groupid: { type: Schema.Types.ObjectId, ref: "Group" },
  active: Boolean
},{timestamps: true});

module.exports = mongoose.model('Chat', ChatSchema);