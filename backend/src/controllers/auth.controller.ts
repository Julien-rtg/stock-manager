import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.ts";
import { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

export class AuthController {
  public async register(req: Request) {
    try {
      const { username, password, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      return { message: "User registered successfully", code: 201 };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }

  public async login(req: Request) {
    try {
      const { username, password } = req.body;
      const user: any = await User.findOne({ where: { username: username } });
      if (!user) {
        return { message: "Authentication failed", code: 401 };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { message: "Authentication failed", code: 401 };
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || ""
      );
      return { message: token, code: 200 };
    } catch (error) {
      return { message: "Login failed", code: 500 };
    }
  }
}
