'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  users: { type: Array, ref: "User" },
  created_by: { type: Schema.Types.ObjectId, ref: "User" },
  groupname: String,
  active: {type: Boolean, default:true},
},{timestamps:true});

module.exports = mongoose.model('Group', GroupSchema);