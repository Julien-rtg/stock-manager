import { Product } from "../models/Product.model.ts";

export class ProductController {

  public async createProduct(req: any) {
    try {
      const { name, price } = req.body;
      console.log(req.body);
      await Product.create({
        name: name,
        price: price,
      });
      return { message: "Product created successfully", code: 201 };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }

}
