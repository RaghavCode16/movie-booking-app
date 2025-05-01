const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  artistid: Number,
  first_name: String,
  last_name: String,
  wiki_url: String,
  profile_url: String,
  movies: [Number], //List of movie IDs
});

module.exports = mongoose.model("Artist", artistSchema);
