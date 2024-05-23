const jwt = require("jsonwebtoken");
require('dotenv').config();

class AuthMiddleware {
  
    async verifyToken(req, next) {
      const token = req.header("Authorization");
      if (!token) {
        return { message: "Access denied", code: 401 };
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        return { message: "Token is valid", code: 200 };
      } catch (error) {
        return { message: "Invalid token", code: 401 };
      }
    }
  
  
}

const authMiddleware = new AuthMiddleware();

module.exports = authMiddleware;
