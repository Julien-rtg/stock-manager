import { useEffect, useState } from "react";
import { StocksChangeInterface } from "../../../interfaces/stocks_change.interface.ts";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import { DatabaseService } from "../../../services/database.service.ts";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import StockRow from "./StockRow.tsx";
import NewStockModal from "./NewStockModal.tsx";

export interface StockToDisplayInterface extends StocksChangeInterface {
  name: string;
}

function StockList() {
  const [stocksChange, setStock] = useState<StocksChangeInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [stockDisplay, setStockDisplay] = useState<StockToDisplayInterface[]>(
    []
  );

  const setStockHandler = () => {
    const databaseService = new DatabaseService();

    setStock(databaseService.db.stocks_change);
    setProducts(databaseService.db.products);
  };

  useEffect(() => {
    setStockHandler();
  }, []);

  useEffect(() => {
    const stockToDisplay = stocksChange.map(
      (element: StocksChangeInterface) => {
        const productName =
          products.find((el: ProductInterface) => el.id === element.product_id)
            ?.name || "Undefined name";

        return {
          name: productName,
          ...element,
        };
      }
    );

    setStockDisplay(stockToDisplay);
  }, [stocksChange, products]);

  return (
    <div>
      <NewStockModal callback={setStockHandler}></NewStockModal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Movement</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockDisplay.map((stock: StockToDisplayInterface) => (
              <StockRow key={stock.id} stock={stock} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StockList;
