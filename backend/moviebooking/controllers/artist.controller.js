const Artist = require("../models/artist.model");

exports.findAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error retrieving artists." });
  }
};
