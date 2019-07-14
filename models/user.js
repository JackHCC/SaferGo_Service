var mongoose = require('mongoose');
var db = require('../lib/db');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    age: String,
    sex: String,
    mobilePhone: String,
    emergencyPhone: String,
    email: String,
    friends: [
        {
            friends_email: String,
            addTime: String
        }
    ],
    imageUrl: String,
    created_at: String,
    individuality: String,
    birthplace: String,
    livePlace: String
});

var UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel