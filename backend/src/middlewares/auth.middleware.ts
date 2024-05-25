import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class AuthMiddleware {

  public async verifyToken(req: any) {
    const token = req.header("Authorization");
    if (!token) {
      return { message: "Access denied", code: 401 };
    }
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      req.userId = decoded.userId;
      return { message: "Token is valid", code: 200 };
    } catch (error) {
      return { message: "Invalid token", code: 401 };
    }
  }
}
