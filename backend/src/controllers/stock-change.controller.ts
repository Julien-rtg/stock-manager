import { StockChange } from "../models/index.ts";

export class StockChangeController {
  public async getStockChanges() {
    try {
      const stockChanges = await StockChange.findAll();
      return { message: stockChanges, code: 200 };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }
}
