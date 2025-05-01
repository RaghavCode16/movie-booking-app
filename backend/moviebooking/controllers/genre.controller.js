const Genre = require("../models/genre.model");

exports.findAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || "Error retrieving genres." });
  }
};
