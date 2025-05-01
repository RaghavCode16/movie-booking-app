const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Middleware to check if user is logged in
router.post("/signup", userController.create);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/getCouponCode", userController.getCouponCode);
router.post("/bookShow", userController.bookShow);

module.exports = router;
