const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    mail: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    remainingVotes: { type: Number, default: 5 },
    votedGames: [{
        gameId: { type: Schema.Types.ObjectId, ref: "Game" },
        voteCount: { type: Number, default: 1 }
    }]
});
const User = mongoose.model('User', userSchema);
module.exports = User;