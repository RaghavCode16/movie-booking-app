const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

// Example route
router.get("/movies", movieController.findAllMovies);

module.exports = router;
