import { Product } from "../models/index.ts";
import { StockChange } from "../models/index.ts";

export class ProductController {
  public async getProducts() {
    try {
      const products = await Product.findAll({
        attributes: ["id", "name", "price", "description"],
        include: {
          model: StockChange,
          limit: 1,
          attributes: ['quantity_at_time'],
          order: [["id", "DESC"]],
        },
      }).then((products) => products.map((product) => {
        const { id, name, price, description } = product;
        const stockChange = product.stock_changes[0];
        return {
          id,
          name,
          price,
          description,
          quantity_at_time: stockChange.quantity_at_time
        };
      }));
      return { message: products, code: 200 };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }

  public async createProduct(req: any) {
    try {
      const { name, price, quantity, description } = req.body;
      if (!quantity) {
        return { message: "Quantity is required", code: 400 };
      }
      const product = await Product.create({
        name: name,
        price: price,
        description: description,
      });
      await StockChange.create({
        quantity: quantity,
        quantity_at_time: quantity,
        date: new Date(),
        productId: product.id,
      });
      return {
        message: "Product created successfully",
        code: 201,
        product: product,
      };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }
}
