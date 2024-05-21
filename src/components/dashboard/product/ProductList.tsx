import ProductRow from "./ProductRow.tsx";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import { useEffect, useState } from "react";
import { DatabaseService } from "../../../services/database.service.ts";
import NewProductModal from "./NewProductModal.tsx";
import {PageService} from "../../../services/page.service.ts";
import {ProductSearchInput} from "./ProductSearchInput.tsx";

function ProductList() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductInterface>();
  const [searchName, setSearchName] = useState<string>("");
  const [searchPrice, setSearchPrice] = useState<string>("");

  const editCallback = (product: ProductInterface) => {
    setOpenEdit(true);
    setEditProduct(product);
  }

  useEffect(() => {
    if (openEdit) {
      setOpenEdit(false);
    }
  }, [openEdit]);

  const deleteCallback = (productId: number) => {
    const databaseService = new DatabaseService();
    databaseService.deleteProduct(productId);
    PageService.flashSuccessMessage("Product deleted successfully");
    setProducts(databaseService.getNotDeletedProducts());
  }

  const setProductsHandler = () => {
    const databaseService = new DatabaseService();
    setProducts(databaseService.getNotDeletedProducts());
  };

  const applyFilters = () => {
    setProductsHandler();
    setProducts((prevProducts) => prevProducts.filter((product: ProductInterface) => product.name.toLowerCase().includes(searchName.toLowerCase())));
    setProducts((prevProducts) => prevProducts.filter((product: ProductInterface) => product.price.toString().includes(searchPrice)));
  }

  useEffect(() => {
    applyFilters();
  }, [searchName, searchPrice]);

  return (
    <div>
      <NewProductModal callback={setProductsHandler} openEdit={openEdit} product={editProduct}></NewProductModal>
      <ProductSearchInput setSearch={setSearchName} placeholder={"Search name"} />
      <ProductSearchInput setSearch={setSearchPrice} placeholder={"Search price"} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Stock quantity</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: ProductInterface) => (
              <ProductRow key={product.id} product={product} editCallback={() => editCallback(product)} deleteCallback={() => deleteCallback(product.id)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductList;
