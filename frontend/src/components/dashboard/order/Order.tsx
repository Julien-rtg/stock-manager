import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {OrderWithNameInterface} from "./OrderList.tsx";

function Order({order}: { order: OrderWithNameInterface }) {
  return (
    <TableRow
      key={order.id}
      sx={{"&:last-child td, &:last-child th": {border: 0}}}
    >
      <TableCell align="center" component="th" scope="row">
        {order.name}
      </TableCell>
      <TableCell align="center">{order.quantity_ordered}</TableCell>
      <TableCell align="center">{order.price}</TableCell>
      <TableCell align="center">{order.date}</TableCell>
    </TableRow>
  );
}

export default Order;
