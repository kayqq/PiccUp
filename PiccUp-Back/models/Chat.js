'use strict';

var mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var ChatSchema = mongoose.Schema({
    id: { type: String, unique: true, default: uuidv4, required: true },
    users: { type: Array, unique: true }
});

module.exports = mongoose.model('Chat', ChatSchema);
