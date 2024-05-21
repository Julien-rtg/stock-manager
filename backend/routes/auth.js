const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const bcrypt = require('bcrypt');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

// define the home page route
router.get("/", function (req, res) {
  res.json({ res: "Auth home page" });
});

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
