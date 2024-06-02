import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import "./product.scss";

interface ProductRowProps {
  product: ProductInterface;
  editCallback: (product: ProductInterface) => void;
  deleteCallback: () => void;
}

export const ProductRow = ({
  product,
  editCallback,
  deleteCallback,
}: ProductRowProps) => {


  return (
    <TableRow
      onClick={() => editCallback(product)}
      key={product.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center" component="th" scope="row">
        {product.name}
      </TableCell>
      <TableCell align="center">{product.price}</TableCell>
      <TableCell align="center">{product.quantity_at_time}</TableCell>
      <TableCell align="center">
        <div onClick={deleteCallback}>
          <DeleteIcon className="deleteIcon"></DeleteIcon>
        </div>
      </TableCell>
    </TableRow>
  );
};
