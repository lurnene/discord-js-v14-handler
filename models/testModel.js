const mongoose = require('mongoose');

module.exports = mongoose.model(
    'test', 
    new mongoose.Schema({
        userID: String,
        guildID: String,
    })
);