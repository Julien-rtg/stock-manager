import { StocksChangeInterface } from "../interfaces/stocks_change.interface.ts";
import { ProductInterface } from "../interfaces/product.interface.ts";
import { OrderInterface } from "../interfaces/order.interface.ts";
import db from "../db/db.json";

export interface DbSchema {
  stocks_change: StocksChangeInterface[];
  products: ProductInterface[];
  orders: OrderInterface[];
}

export const initialDatabaseState: DbSchema = {
  stocks_change: [],
  products: [],
  orders: [],
};

export class DatabaseService {
  public LOCALSTORAGE_KEY = "react_product_management";

  public db: DbSchema = initialDatabaseState;

  constructor() {
    this.initDatabase();
  }

  public initDatabase() {
    const localStorageDb: string | null = localStorage.getItem(
      this.LOCALSTORAGE_KEY
    );

    if (localStorageDb) {
      this.db = JSON.parse(localStorageDb);
      return;
    }

    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(db));
    this.db = db;
  }

  public pushOrder(order: OrderInterface) {
    this.db.orders.push(order);
    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(this.db));
  }

  public pushStocksChange(stocks_change: StocksChangeInterface) {
    const productQuantity = this.getProductQuantity(stocks_change.product_id);

    if (productQuantity) {
      stocks_change.quantity_at_time = productQuantity;
    } else {
      stocks_change.quantity_at_time = stocks_change.quantity;
    }

    this.db.stocks_change.push(stocks_change);
    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(this.db));
  }

  public pushProduct(product: ProductInterface) {
    this.db.products.push(product);
    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(this.db));
  }

  public getNotDeletedProducts(): ProductInterface[] {
    return this.db.products.filter((product: ProductInterface) => !product.deleted);
  }

  public editProduct(product: ProductInterface) {
    this.db.products = this.db.products.map((existingProduct: ProductInterface) => {
      if (existingProduct.id === product.id) {
        return product;
      }

      return existingProduct;
    });

    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(this.db));
  }

  public deleteProduct(productId: number) {
    this.db.products.map((product: ProductInterface) => {
      if (product.id === productId) {
        product.deleted = true;
      }

      return product;
    });

    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(this.db));
  }

  public getProductQuantity(productId: number): number | undefined {
    const relevantStockChange = this.db.stocks_change.filter((stock: StocksChangeInterface) => stock.product_id === productId);
    if (relevantStockChange.length === 0) {
      return;
    }

    return relevantStockChange.slice(-1)[0].quantity_at_time || 0;
  }
}
