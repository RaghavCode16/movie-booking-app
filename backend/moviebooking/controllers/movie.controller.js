const Movie = require("../models/movie.model");

//Find all movies or filter by status
exports.findAllMovies = async (req, res) => {
  try {
    const condition = req.query.status ? { status: req.query.status } : {};
    const movies = await Movie.find(condition);
    res.status(200).json(movies);
  } catch (err) {
    res
      .status(500)
      .jsom({ message: err.message || "Error retrieving movies." });
  }
};

//Find a movie by id
exports.findOne = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send({ message: "Movie not found." });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving movie." });
  }
};

//// Find shows of a specific movie by ID (sample response for now)

exports.findShows = async (req, res) => {
  try {
    // Stubbed response;
    res.status(200).json({
      movieId: req.params.id,
      shows: ["10:00 AM", "2:00 PM", "6:00 PM", "9:00 PM"],
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving shows." });
  }
};
