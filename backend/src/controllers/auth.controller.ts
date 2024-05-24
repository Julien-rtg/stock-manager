import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

export class AuthController {
  private userModel: User = new User();
  private user: Promise<any> = this.userModel.createUser();

  public async register(req: Request) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new (await this.user)({
        username,
        password: hashedPassword,
      });
      await user.save();
      return { message: "User registered successfully", code: 201 };
    } catch (error) {
      return { message: "Registration failed", code: 500 };
    }
  }

  public async login(req: Request) {
    try {
      const { username, password } = req.body;
      const user = await (
        await this.user
      ).findOne({ where: { username: username } });
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
