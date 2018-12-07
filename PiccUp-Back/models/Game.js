'use strict';

var mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var Game = mongoose.Schema({
    id: { type: String, unique: true, default: uuidv4, required: true },
    game: { type: String, required: true },
    teams: Number,
    description: String,
    max_slots: Number,
    yelpLocation: {
        id: String,
        name: String,
        address: String,
        city: String,
        state: String,
        url: String,
        image_url: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    lobby_leader: { type: String, required: true },
    current_players: {
        team1: Array,
        team2: Array
    },
    filled_slots: { type: Number, default: 1 },
    eventDate: { type: String, default: new Date() },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Game', Game);
