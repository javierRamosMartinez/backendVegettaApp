const express = require("express");

const gameRouter = express.Router();
const {
    getGame,
    getAllGames,
    addGame,
    updateGame,
    removeGame,
    getGamesByName,
} = require("./game.controller");


gameRouter.post("/", addGame);
gameRouter.get("/:id", getGame);
gameRouter.get("/games", getGamesByName);
gameRouter.put("/:id", updateGame);
gameRouter.delete("/:id", removeGame);
gameRouter.get("/", getAllGames);

module.exports = gameRouter;