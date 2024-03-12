const GameController = require("../controller/GameController");
const router = require("express").Router();

router.post("/create", GameController.createGame);
router.get("/:gameId", GameController.fetchGame);
router.patch("/join", GameController.joinGame);

module.exports = router;
