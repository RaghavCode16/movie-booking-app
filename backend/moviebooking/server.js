const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { DB_URL } = require("./config/db.config");

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON in request body

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Upgrad Movie booking application development.",
  });
});

// Route imports
const movieRoutes = require("./routes/movie.routes");
const genreRoutes = require("./routes/genre.routes");
const artistRoutes = require("./routes/artist.routes");
const userRoutes = require("./routes/user.routes");

// Route mounting with base path /api
app.use("/api/movies", movieRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/auth", userRoutes);

// MongoDB connection
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit(1);
  });

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
