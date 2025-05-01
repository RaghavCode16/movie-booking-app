const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  genreid: Number,
  genre: String,
});

module.exports = mongoose.model("Genre", genreSchema);
