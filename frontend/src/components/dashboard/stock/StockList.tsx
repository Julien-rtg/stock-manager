import React, { useEffect, useState } from "react";
import { StocksChangeInterface } from "../../../interfaces/stocks_change.interface.ts";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import StockRow from "./StockRow.tsx";
// import NewStockModal from "./NewStockModal.tsx";
import { StockService } from "../../../services/api/stock.service.ts";
import { ProductService } from "../../../services/api/product.service.ts";
import { TablePagination } from "@mui/material";

export interface StockToDisplayInterface extends StocksChangeInterface {
  name: string;
}

function StockList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(0);
  const [stocksChange, setStock] = useState<StocksChangeInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [stockDisplay, setStockDisplay] = useState<StockToDisplayInterface[]>(
    []
  );
  const stockService = new StockService();
  const productService = new ProductService();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setStockHandler(newPage, rowsPerPage);
    console.log(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setStockHandler(0, parseInt(event.target.value, 10));
  };

  const setStockHandler = async (page: number = 0, rows: number = 10) => {
    const dataStock = await stockService.getAll(page, rows);
    const dataProducts = await productService.getAll();
    setCount(dataStock.count);
    setStock(dataStock.rows);
    setProducts(dataProducts);
  };

  useEffect(() => {
    setStockHandler();
  }, []);

  useEffect(() => {
    console.log(stocksChange, products);
    const stockToDisplay = stocksChange.map(
      (element: StocksChangeInterface) => {
        const productName =
          products.find((el: ProductInterface) => el.id === element.productId)
            ?.name || "Undefined name";

        return {
          name: productName,
          formatedDate: new Date(element.createdAt).toLocaleDateString(
            "fr-FR",
            { hour: "2-digit", minute: "2-digit" }
          ),
          ...element,
        };
      }
    );

    setStockDisplay(stockToDisplay);
  }, [stocksChange, products]);

  return (
    <div>
      {/* <NewStockModal callback={setStockHandler}></NewStockModal> */}

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
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default StockList;
