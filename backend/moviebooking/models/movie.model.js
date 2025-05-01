const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieid: Number,
  title: String,
  published: Boolean,
  released: Boolean,
  release_date: Date,
  publish_date: Date,
  poster_url: String,
  trailer_url: String,
  artists: [Number], // array of artist IDs
  genres: [String], // array of genre names
  duration: Number,
  critic_rating: Number,
  storyline: String,
  shows: [
    {
      id: Number,
      language: String,
      show_timing: Date,
      theatre: {
        name: String,
        city: String,
      },
      available_seats: [Number],
    },
  ],
});

module.exports = mongoose.model("Movie", movieSchema);
