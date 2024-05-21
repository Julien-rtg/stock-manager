import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {StockToDisplayInterface} from "./StockList.tsx";
import "./stock.css";

interface StockRowProps {
  stock: StockToDisplayInterface
}

function StockRow({stock}: StockRowProps) {

  const getRowClass = (quantity: number): string => {
    return quantity > 0 ? "positive-row" : "negative-row";
  }

  return (
    <TableRow
      key={stock.id}
      sx={{"&:last-child td, &:last-child th": {border: 0}}}
      className={getRowClass(stock.quantity)}
    >
      <TableCell align="center" component="th" scope="row">
        {stock.name}
      </TableCell>
      <TableCell align="center">{stock.quantity}</TableCell>
      <TableCell align="center">{stock.quantity_at_time}</TableCell>
      <TableCell align="center">{stock.date}</TableCell>
    </TableRow>
  )
}

export default StockRow;
