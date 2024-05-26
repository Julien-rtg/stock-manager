import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthorized = async (req: any, res:any, next: any) => {
  let token = req.header("Authorization");
  if (!token) {
    return next({ message: "Access denied", code: 401 });
  }
  try {
    token = token.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return next({ message: "Access denied", code: 401 });
  }
}
