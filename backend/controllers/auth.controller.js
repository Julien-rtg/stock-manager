const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const jwt = require('jsonwebtoken');

class AuthController {

  constructor() {
    this.user = User.createUser();
  }

  async register(req) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new (await this.user)({ username, password: hashedPassword });
      await user.save();
      return { message: "User registered successfully", code: 201 };
    } catch (error) {
      return { message: "Registration failed", code: 500 };
    }
  }

  async login(req) {
    try {
      const { username, password } = req.body;
      const user = await (await this.user).findOne({ where: { username: username } });
      if (!user) {
        return { message: "Authentication failed", code: 401 };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { message: "Authentication failed", code: 401 };
      }
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { message: token, code: 200 };
    } catch (error) {
      return { message: "Login failed", code: 500 };
    }
  }

}

const authController = new AuthController();

module.exports = authController;