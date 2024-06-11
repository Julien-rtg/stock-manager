import { environment } from "../../environment";
import { StocksChangeInterface } from "../../interfaces/stocks_change.interface";

export class StockService {
  async getAll(page: number, rows: number): Promise<{count:number, rows:StocksChangeInterface[]}> {
    const data = await fetch(environment.baseUrl + `stock-change?page=${page}&rows=${rows}`, {
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
    return data.stock;
  }
}
