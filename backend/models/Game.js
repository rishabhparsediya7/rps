const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  code: { type: String, required: true },
  codeGeneratedBy: { type: String, required: true },
  opponent: { type: String, required: false },
  joined: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("GameSchema", GameSchema);
