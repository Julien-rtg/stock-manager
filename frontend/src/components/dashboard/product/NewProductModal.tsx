import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import { InputLabel } from "@mui/material";
import { DatabaseService } from "../../../services/database.service.ts";
import {PageService} from "../../../services/page.service.ts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewProductModal({callback, openEdit, product}: { callback: () => void, openEdit: boolean, product?: ProductInterface}) {
  const databaseService = new DatabaseService();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [open, setOpen] = React.useState(false);

  const switchModal = () => setOpen(!open)
  const resetModal = () => {
    setName("");
    setPrice("");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };
  
  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock(event.target.value);
  };

  const onConfirm = () => {
    if (isNaN(parseInt(price))) {
      PageService.flashErrorMessage("Price must be a number");
      return;
    }

    if (parseInt(price) <= 0) {
      PageService.flashErrorMessage("Price must be positive");
      return;
    }

    if (product) {
      const entry: ProductInterface = {
        id: product.id,
        name: name,
        price: parseInt(price)
      }
      databaseService.editProduct(entry);
      PageService.flashSuccessMessage("Product edited successfully");
    } else {
      const entry: ProductInterface = {
        id: products.slice(-1)[0].id + 1,
        name: name,
        price: parseInt(price)
      }
      databaseService.pushProduct(entry);
      PageService.flashSuccessMessage("Product added successfully");
    }

    setProducts(databaseService.db.products);

    callback();
    switchModal();
    resetModal();
  };

  useEffect(() => {
    setProducts(databaseService.db.products);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openEdit) {
      switchModal();
    }
    if(product){
      setName(product.name);
      setPrice(product.price.toString());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEdit]);

  return (
    <div>
      <Button onClick={switchModal} variant="contained" color="success">
        New product
      </Button>

      <Modal
        open={open}
        onClose={switchModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <FormControl fullWidth>
          <InputLabel htmlFor="price">Name</InputLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              type="text"
              value={price}
              onChange={handlePriceChange}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="stock">Stock</InputLabel>
            <Input
              id="stock"
              type="text"
              value={stock}
              onChange={handleStockChange}
            />
          </FormControl>

          <Button onClick={onConfirm} variant="contained" color="success">
            Validate
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
