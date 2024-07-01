import { Order } from "../models/Order.model.ts";
import { OrderProduct } from "../models/OrderProduct.model.ts";
import { Product } from "../models/index.ts";
import { StockChange } from "../models/index.ts";

export class OrderController {
  public async getOrders() {
    try {
      const orders = await Order.findAll({
        include: { model: Product },
      });
      return { message: orders, code: 200 };
    } catch (error) {
      return { message: error, code: 500 };
    }
  }

  public async createOrder(req: any) {
    try {
      const { total_price, product } = req.body;
      const order = await Order.create({
        total_price: total_price,
      });
      for await (const entries of product) {
        await OrderProduct.create({
          quantity_ordered: entries.quantity_ordered,
          orderId: order.id,
          productId: entries.id,
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

  public async updateProduct(id: number | string, req: any) {
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
      const latestStock = await StockChange.findOne({
        where: { productId: id },
        order: [["id", "DESC"]],
        limit: 1,
      });
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

  public async deleteProduct(id: number | string) {
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
