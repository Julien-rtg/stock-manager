import { environment } from "../../environment";
import { ProductInterface } from "../../interfaces/product.interface";

export class ProductService {
  async getAll(): Promise<ProductInterface[]> {
    const data = await fetch(environment.baseUrl + "products", {
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
    return data.products;
  }

  async get(id: number) {
    const response = await fetch(environment.baseUrl + "products/" + id);
    return response.json();
  }

  async create(data: ProductInterface) {
    const response = await fetch(environment.baseUrl + "products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async update(id: number, data: ProductInterface) {
    const response = await fetch(environment.baseUrl + "products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async delete(id: number) {
    const response = await fetch(environment.baseUrl + "products/" + id, {
      method: "DELETE",
    });
    return response.json();
  }
}
