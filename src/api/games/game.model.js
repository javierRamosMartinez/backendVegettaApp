const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({

    name: { type: String, required: true },
    image: { type: String, required: false },
    description: { type: String, required: false },
    category: {
        type: String,
        default: "",
        enum: ["action", "adventure", "fighting", "sports", "RPG", "racing", "shooter", "simulation"],
        required: false,
    },
    votes: { type: Number, default: 0 },

});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;