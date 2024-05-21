import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import "./product.css";
import {DatabaseService} from "../../../services/database.service.ts";

interface ProductRowProps {
  product: ProductInterface;
  editCallback: (product: ProductInterface) => void;
  deleteCallback: () => void;
}

function ProductRow({ product, editCallback, deleteCallback }: ProductRowProps) {

  const getCurrentQuantity = (): number => {
    const databaseService = new DatabaseService();
    return databaseService.getProductQuantity(product.id) || 0;
  }

  return (
    <TableRow onClick={() => editCallback(product)}
      key={product.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center" component="th" scope="row">
        {product.name}
      </TableCell>
      <TableCell align="center">{product.price}</TableCell>
      <TableCell align="center">
        {getCurrentQuantity()}
      </TableCell>
      <TableCell align="center">
        <div onClick={deleteCallback}>
          <DeleteIcon className="deleteIcon"></DeleteIcon>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
