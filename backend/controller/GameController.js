const GameModel = require("../models/Game");

const createGame = async (req, res) => {
  const { code, codeGeneratedBy, joined } = req.body;
  try {
    const game = new GameModel({
      code: code,
      codeGeneratedBy: codeGeneratedBy,
      joined: false,
    });
    const savedGame = await game.save();
    if (savedGame) {
      res.status(200).json({ code: code, gameId: savedGame._id });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchGame = async (req, res) => {
  const gameId = req.params.gameId;
  try {
    const game = await GameModel.findOne({ _id: gameId });
    if (game) {
      res.status(200).json({ game: game });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const joinGame = async (req, res) => {
  const {code} = req.body;
  console.log(code);
  try {
    const game = await GameModel.findOne({ code: code });
    console.log(game);
    if (game) {
      const updatedGame = await GameModel.updateOne(
        { _id: game._id },
        { $set: { joined: true } }
      );
      const uGame = await GameModel.findOne({ _id: game._id });
      if (updatedGame.acknowledged) res.status(200).json({ game: uGame });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createGame,
  fetchGame,
  joinGame,
};
