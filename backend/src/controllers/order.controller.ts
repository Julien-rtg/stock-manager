import { Order } from "../models/Order.model.ts";
import { OrderProduct } from "../models/OrderProduct.model.ts";
import { Product } from "../models/index.ts";
import { StockChange } from "../models/index.ts";

export class OrderController {
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

  public async createOrder(req: any) {
    try {
      const { quantity_ordered, total_price, productId } = req.body;
      const order = await Order.create({
        quantity_ordered: quantity_ordered,
        total_price: total_price,
      });
      for await (const id of productId) {
        await OrderProduct.create({
          orderId: order.id,
          productId: id,
        });
      }
      return {
        message: "Order created successfully",
        code: 201,
        order: order,
      };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }

  public async updateProduct(id: number|string, req: any) {
    try {
      const { name, price, quantity, description } = req.body;
      const product = await Product.findByPk(id);
      if (!product) {
        return { message: "Product not found", code: 404 };
      }
      product.name = name;
      product.price = price;
      product.description = description;
      await product.save();
      const latestStock = await StockChange.findOne( { where: { productId: id }, order: [["id", "DESC"]], limit: 1 } );
      await StockChange.create({
        quantity: quantity - latestStock!.quantity_at_time,
        quantity_at_time: quantity,
        productId: product.id,
      });
      return {
        message: "Product updated successfully",
        code: 200,
        product: product,
      };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }

  public async deleteProduct(id: number|string) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return { message: "Product not found", code: 404 };
      }
      await StockChange.destroy({ where: { productId: product.id } });
      await product.destroy();
      return { message: "Product deleted successfully", code: 200 };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }
}
