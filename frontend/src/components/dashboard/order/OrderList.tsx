import Order from "./Order";

import NewOrderModal from "./NewOrderModal.tsx";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useEffect, useState} from "react";
import {OrderInterface} from "../../../interfaces/order.interface.ts";
import {ProductInterface} from "../../../interfaces/product.interface.ts";
import {DatabaseService} from "../../../services/database.service.ts";

export interface OrderWithNameInterface extends OrderInterface {
  name: string;
}

function OrderList() {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [ordersDisplay, setOrderDisplay] = useState<OrderWithNameInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);

  const setOrdersAndProducts = () => {
    const databaseService = new DatabaseService();
    setOrders(databaseService.db.orders);
    setProducts(databaseService.db.products);
  }

  useEffect(() => {
    setOrdersAndProducts();
  }, [])

  useEffect(() => {
    const orderToDisplay: OrderWithNameInterface[] = orders.map((order: OrderInterface) => {
      const productName = products.find((product: ProductInterface) => product.id === order.product_id
      )?.name || "Undefined name";

      return {...order, name: productName};
    });

    setOrderDisplay(orderToDisplay);
  }, [orders, products]);

  return (
    <div>
      <NewOrderModal callback={setOrdersAndProducts}></NewOrderModal>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Quantity Ordered</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersDisplay.map((row: OrderWithNameInterface) => (
              <Order key={row.id} order={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrderList;
