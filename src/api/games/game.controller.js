const Game = require('./game.model');

const addGame = async (req, res) => {
    try {
        const game = new Game(req.body)
        const gameExist = await Game.findOne({ name: req.body.name });
        if (gameExist) {
            return res.status(400).json({ status: 400, message: "game already exist" });
        }
        const newGame = await game.save();
        console.log(newGame);
        return res.json({
            status: 201,
            message: `Game ${game.name} created`,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: " Internal server error",
            error: error.message,
        });
    }
}
const getGame = async (req, res) => {
    try {
        const id = req.params.id;
        const game = await Game.findById(id);
        res.json({
            status: 200,
            msg: "ok",
            data: game,
        });
    } catch (error) {
        return "error at get game ", error;
    }
};
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json({
            status: 200,
            msg: "ok",
            data: games,
        });
    } catch (error) {
        return "error at get all games", error;
    }
};

const updateGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        if (!game) {
            return res.status(404).json({
                status: 404,
                message: "Game not found",
            });
        }

        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json({
            status: 200,
            message: "Game updated successfully",
            data: updatedGame,
        });
    } catch (error) {
        console.error("Error at update game:", error);
        return res.status(500).json({
            status: 500,
            message: "Error updating the game",
            error: error.message,
        });
    }
};
const removeGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id, req.body, { new: true })
        res.json({ status: 200, message: "ok", data: game });
    } catch (error) {
        res.status(500).json(error);
    }
}

const getGamesByName = async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
            return res.status(400).json({
                status: 400,
                msg: "Please provide a name to search",
            });
        }

        const games = await Game.find({ name: new RegExp(name, 'i') });

        if (games.length === 0) {
            return res.status(404).json({
                status: 404,
                msg: "No games found with that name",
            });
        }

        return res.json({
            status: 200,
            msg: "ok",
            data: games,
        });
    } catch (error) {
        console.error("error at get games by name", error);
        return res.status(500).json({
            status: 500,
            msg: "Server error",
            error: error.message,
        });
    }
};

module.exports = { addGame, getGame, getAllGames, updateGame, removeGame, getGamesByName };