'use strict';

var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');

var UserSchema = mongoose.Schema({
    id: { type: String, unique: true, default: uuidv4 },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    joined: {
        type: Date,
        default: new Date(),
        required: true
    }
});

// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

UserSchema.methods.getProfile = function() {
    const user = {
        id: this.id,
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        city: this.city,
        state: this.state,
        instagram: this.instagram,
        joined: this.joined
    };
    return user;
};

// authenticate input against database
// UserSchema.statics.authenticate = function(username, password, callback) {
//     User.findOne({ username: username }).exec(function(err, user) {
//         if (err) {
//             return callback(err);
//         } else if (!user) {
//             var err = new Error('User not found.');
//             err.status = 401;
//             return callback(err);
//         }
//         bcrypt.compare(password, user.password, function(err, result) {
//             if (result === true) {
//                 return callback(null, user);
//             } else {
//                 return callback();
//             }
//         });
//     });
// };

// hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
