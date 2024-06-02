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
      const { message, code } = await this.productController.getProducts();
      res.status(code).json({ products: message });
    });

    this.router.post("/", isAuthorized, async (req, res) => {
      const { message, code } = await this.productController.createProduct(req);
      res.status(code).json({ message: message });
    });

    this.router.put("/:id", isAuthorized, async (req, res) => {
      const { id } = req.params;
      const { message, code } = await this.productController.updateProduct(id, req);
      res.status(code).json({ message: message });
    });

    this.router.delete("/:id", isAuthorized, async (req, res) => {
      const { id } = req.params;
      const { message, code } = await this.productController.deleteProduct(id);
      res.status(code).json({ message: message });
    });

  }
}
