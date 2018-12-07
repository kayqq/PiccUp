'use strict';

var mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var MessageSchema = mongoose.Schema({
    id: { type: String, unique: true, default: uuidv4, required: true },
    chatId: { type: String, required: true },
    message: String,
    sender: { type: String, required: true },
    time: String
});

MessageSchema.pre('save', function(next) {
    var message = this;
    function getTime(date) {
        return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
    }
    const newTime = getTime(new Date(Date.now()));
    console.log(newTime);
    message.time = newTime;
    next();
});

module.exports = mongoose.model('Message', MessageSchema);
