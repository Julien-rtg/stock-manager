import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, Input, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import { InputLabel, MenuItem } from "@mui/material";
import { DatabaseService } from "../../../services/database.service.ts";
import { OrderInterface } from "../../../interfaces/order.interface.ts";
import { DateService } from "../../../services/date.service.ts";
import { StocksChangeInterface } from "../../../interfaces/stocks_change.interface.ts";
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

export default function NewOrderModal({callback}: { callback: () => void}) {
  const databaseService = new DatabaseService();
  const currentDateService = new DateService();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<string>("");
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [stocksChange, setStocksChange] = useState<StocksChangeInterface[]>([]);
  const [open, setOpen] = React.useState(false);

  const switchModal = () => setOpen(!open)
  const resetModal = () => {
    setName("");
    setQuantity("");
  }

  const handleChange = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const onConfirm = () => {
    if (isNaN(parseInt(quantity))) {
      PageService.flashErrorMessage("Quantity must be a number");
      return;
    }
    if (parseInt(quantity) <= 0) {
      PageService.flashErrorMessage("Quantity must be positive");
      return;
    }

    const orderQuantity = parseInt(quantity);

    const productPrice = products.find(
      (product: ProductInterface) => product.id === parseInt(name)
    )?.price;
    const entry: OrderInterface = {
      id: orders.slice(-1)[0].id + 1,
      product_id: parseInt(name),
      quantity_ordered: orderQuantity,
      price: (productPrice ?? 0) * orderQuantity,
      date: currentDateService.getCurrentDate(),
    };
    databaseService.pushOrder(entry);
    setOrders(databaseService.db.orders);

    const entryStock: StocksChangeInterface = {
      id: stocksChange.slice(-1)[0].id + 1,
      product_id: parseInt(name),
      quantity: -Math.abs(orderQuantity),
      date: currentDateService.getCurrentDate(),
    };
    databaseService.pushStocksChange(entryStock);
    setStocksChange(databaseService.db.stocks_change);

    PageService.flashSuccessMessage("Order added successfully")

    callback();
    switchModal();
    resetModal();
  };

  useEffect(() => {
    setProducts(databaseService.db.products);
    setOrders(databaseService.db.orders);
    setStocksChange(databaseService.db.stocks_change);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button onClick={switchModal} variant="contained" color="success">
        New order
      </Button>

      <Modal
        open={open}
        onClose={switchModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Name</InputLabel>
            <Select
              labelId="name-label"
              id="name"
              value={name}
              label="name"
              onChange={handleChange}
            >
              {products.map((product: ProductInterface) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="quantity">Quantity ordered</InputLabel>
            <Input
              id="quantity"
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
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
