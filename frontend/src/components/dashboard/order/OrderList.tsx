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
import { OrderService } from "../../../services/api/order.service.ts";

function OrderList() {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const orderService = new OrderService();

  const setOrdersAndProducts = async () => {
    await orderService.getAll().then((data) => {
      console.log(data);
      setOrders(data);
    });
  }

  useEffect(() => {
    setOrdersAndProducts();
  }, [])

  return (
    <div>
      <NewOrderModal callback={setOrdersAndProducts}></NewOrderModal>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Products</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row: OrderInterface) => (
              <Order key={row.id} order={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrderList;
