import express from "express";
import { isAuthorized } from "../middlewares/auth.middleware.ts";
import { StockChangeController } from "../controllers/stock-change.controller.ts";

export class StockChangeRouter {
  private router: express.Router = express.Router();
  private stockChangeController: StockChangeController =
    new StockChangeController();
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
      const page = req.query.page;
      const offset = page ? +page * 10 : 0;
      const limit = req.query.rows ? +req.query.rows : 10;
      console.log(req.query);
      const { message, code } =
        await this.stockChangeController.getStockChanges(offset, limit);
      res.status(code).json({ stock: message });
    });
  }
}
