import { ProductRow } from "./ProductRow.tsx";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import { useEffect, useState } from "react";
import { NewProductModal } from "./NewProductModal.tsx";
import { PageService } from "../../../services/page.service.ts";
import { ProductSearchInput } from "./ProductSearchInput.tsx";
import { ProductService } from "../../../services/api/product.service.ts";

export const ProductList = () => {
  const [untouchedProducts, setUntouchedProducts] = useState<ProductInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductInterface>();
  const [searchName, setSearchName] = useState<string>("");
  const [searchPrice, setSearchPrice] = useState<string>("");
  const productService = new ProductService();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editCallback = (product: ProductInterface, event: any) => {
    if(event.target.id === "delete" || event?.target?.nodeName === 'path') return;
    setOpenEdit(true);
    setEditProduct(product);
  };

  useEffect(() => {
    if (openEdit) {
      setOpenEdit(false);
    }
  }, [openEdit]);

  const deleteCallback = async (productId: number) => {
    await productService.delete(productId);
    setProductsHandler();
    PageService.flashSuccessMessage("Product deleted successfully");
  };

  const setProductsHandler = async () => {
    const data = await productService.getAll();
    console.log(data);
    setProducts(data);
    setUntouchedProducts(data);
  };

  const applyFilters = () => {
    setProducts(untouchedProducts);
    setProducts((prevProducts) =>
      prevProducts.filter((product: ProductInterface) =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      )
    );
    setProducts((prevProducts) =>
      prevProducts.filter((product: ProductInterface) =>
        product.price.toString().includes(searchPrice)
      )
    );
  };

  useEffect(() => {
    applyFilters();
  }, [searchName, searchPrice]);

  useEffect(() => {
    setProductsHandler();
  }, []);

  return (
    <div>
      <NewProductModal
        callback={setProductsHandler}
        openEdit={openEdit}
        product={editProduct}
      ></NewProductModal>
      <ProductSearchInput
        setSearch={setSearchName}
        placeholder={"Search name"}
      />
      <ProductSearchInput
        setSearch={setSearchPrice}
        placeholder={"Search price"}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Stock quantity</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: ProductInterface) => (
              <ProductRow
                key={product.id}
                product={product}
                editCallback={(product, event) => editCallback(product, event)}
                deleteCallback={() => deleteCallback(product.id!)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
