import express from "express";
import { AuthController } from "../controllers/auth.controller.ts";
import { isAuthorized } from "../middlewares/auth.middleware.ts";

export class AuthRouter {
  private router: express.Router = express.Router();
  private authController: AuthController = new AuthController();
  constructor() {
    this.init();
  }
  public getRouter(): express.Router {
    return this.router;
  }

  public init() {
    // middleware that is specific to this router
    this.router.use(function timeLog(req, res, next) {
      next();
    });

    // define the home page route
    this.router.get("/", isAuthorized, async (req, res) => {
      res.json({ message: "Welcome to the auth page" });
    });

    // User registration
    this.router.post("/register", async (req, res) => {
      const { message, code } = await this.authController.register(req);
      res.status(code).json({ message: message });
    });

    // // User login
    this.router.post("/login", async (req, res) => {
      const { message, code } = await this.authController.login(req);
      res.status(code).json({ message: message });
    });
  }
}
