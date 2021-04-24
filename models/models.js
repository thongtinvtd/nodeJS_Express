const mongoose = require('mongoose');

const schemaChess = mongoose.Schema({
     piece: String,
     position: {
        posX : Number,
        posY : Number
        },
    date :{
        type: Date,
        default: Date.now
    }
    });

    module.exports = mongoose.model('models',schemaChess);