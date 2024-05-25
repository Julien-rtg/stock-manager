import express from "express";
import { ProductController } from "../controllers/product.controller.ts";
import { isAuthorized } from "../middlewares/auth.middleware.ts";

export class ProductRouter {
  private router: express.Router = express.Router();
  private productController: ProductController = new ProductController();
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
    this.router.get("/", isAuthorized ,async (req, res) => {
    });

    this.router.post("/create", isAuthorized, async (req, res) => {
      const { message, code } = await this.productController.createProduct(req);
      res.status(code).json({ message: message });
    });

  }
}
