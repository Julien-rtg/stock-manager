import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, Input, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import { InputLabel } from "@mui/material";
import { PageService } from "../../../services/page.service.ts";
import { ProductService } from "../../../services/api/product.service.ts";

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

export const NewProductModal = ({
  callback,
  openEdit,
  product,
}: {
  callback: () => void;
  openEdit: boolean;
  product?: ProductInterface;
}) => {
  const productService = new ProductService();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [open, setOpen] = React.useState(false);

  const switchModal = () => setOpen(!open);
  const resetModal = () => {
    setName("");
    setPrice("");
    setStock("");
    setDescription("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (event.target.id) {
      case "name":
        setName(event.target.value);
        break;
      case "price":
        setPrice(event.target.value);
        break;
      case "stock":
        setStock(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      default:
        break;
    }
  };

  const onConfirm = async () => {
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
        name: name,
        price: parseInt(price),
        quantity: parseInt(stock),
        description: description,
      };
      await productService.update(product.id!, entry);
      PageService.flashSuccessMessage("Product edited successfully");
    } else {
      const entry: ProductInterface = {
        name: name,
        price: parseInt(price),
        quantity: parseInt(stock),
        description: description,
      };
      await productService.create(entry);
      PageService.flashSuccessMessage("Product added successfully");
    }

    callback();
    switchModal();
    resetModal();
  };

  useEffect(() => {
    if (openEdit) {
      switchModal();
    }
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setStock(product!.quantity_at_time!.toString());
      setDescription(product.description);
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
            <Input id="name" type="text" value={name} onChange={handleChange} />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="stock">Stock</InputLabel>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <TextareaAutosize
              id="description"
              value={description}
              onChange={handleChange}
              minRows={3}
              placeholder="Informations complémentaires"
            />
          </FormControl>

          <Button onClick={onConfirm} variant="contained" color="success">
            Validate
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
