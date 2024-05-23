const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");
require('dotenv').config();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

// define the home page route
router.get("/", async (req, res) => {
  const { message, code } = await authMiddleware.verifyToken(req, res);
  res.status(code).json({ message: message });
});

// User registration
router.post("/register", async (req, res) => {
  const {message, code} = await authController.register(req);
  res.status(code).json({ message: message });
});

// User login
router.post("/login", async (req, res) => {
  const {message, code} = await authController.login(req);
  res.status(code).json({ message: message });
});

module.exports = router;
