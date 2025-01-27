const mongoose = require('mongoose');

const schemaChess = mongoose.Schema({
    name: String,
    position: {
        posX: Number,
        posY: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('models', schemaChess);