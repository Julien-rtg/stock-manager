import { StockChange } from "../models/index.ts";

export class StockChangeController {
  public async getStockChanges(offset: number, limit: number) {
    try {
      const stockChanges = await StockChange.findAndCountAll({offset: offset, limit: limit, order: [["createdAt", "DESC"]]});
      return { message: stockChanges, code: 200 };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }
}
