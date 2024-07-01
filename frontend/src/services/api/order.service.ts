import { environment } from "../../environment";
import { OrderInterface } from "../../interfaces/order.interface";
import { ProductInterface } from "../../interfaces/product.interface";

export class OrderService {
  async getAll(): Promise<OrderInterface[]> {
    const data = await fetch(environment.baseUrl + "orders", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY3NDIwMDV9.D-s80VpPpj7r4KOCd4RMwFPWXDioOMd9yNf0gDTaQVU",
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("An error occurred");
    });
    return data.message;
  }

  async get(id: number) {
    const response = await fetch(environment.baseUrl + "products/" + id);
    return response.json();
  }

  async create(data: ProductInterface) {
    const response = await fetch(environment.baseUrl + "products", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY3NDIwMDV9.D-s80VpPpj7r4KOCd4RMwFPWXDioOMd9yNf0gDTaQVU",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("An error occurred");
    });
    return response.products;
  }

  async update(id: number, data: ProductInterface) {
    const response = await fetch(environment.baseUrl + "products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY3NDIwMDV9.D-s80VpPpj7r4KOCd4RMwFPWXDioOMd9yNf0gDTaQVU",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("An error occurred");
    });
    return response.products;
  }

  async delete(id: number) {
    const response = await fetch(environment.baseUrl + "products/" + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY3NDIwMDV9.D-s80VpPpj7r4KOCd4RMwFPWXDioOMd9yNf0gDTaQVU",
      },
    });
    return response.json();
  }
}
