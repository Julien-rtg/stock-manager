import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { OrderInterface } from "../../../interfaces/order.interface";
import { ProductInterface } from "../../../interfaces/product.interface";

function Order({order}: { order: OrderInterface }) {
  return (
    <TableRow
      key={order.id}
      sx={{"&:last-child td, &:last-child th": {border: 0}}}
    >
      <TableCell align="center" component="th" scope="row">
        {order.products.map((product: ProductInterface, index:number) => (
          product.name + (index < order.products.length - 1 ? ", " : "")
        ))}
      </TableCell>
      <TableCell align="center">{order.total_price}</TableCell>
      <TableCell align="center">{order.createdAt}</TableCell>
    </TableRow>
  );
}

export default Order;
