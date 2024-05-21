import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, Input, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../interfaces/product.interface.ts";
import { InputLabel } from "@mui/material";
import { DatabaseService } from "../../../services/database.service.ts";
import { StocksChangeInterface } from "../../../interfaces/stocks_change.interface.ts";
import { DateService } from "../../../services/date.service.ts";

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

export default function NewStockModal({ callback }: { callback: () => void }) {
  const databaseService = new DatabaseService();
  const currentDateService = new DateService();
  const [name, setName] = useState("");
  const [movement, setMovement] = useState(0);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [stocksChange, setStocksChange] = useState<StocksChangeInterface[]>([]);
  const [open, setOpen] = React.useState(false);

  const switchModal = () => setOpen(!open);
  const resetModal = () => {
    setName("");
    setMovement(0);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };

  const handleMovementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovement(parseInt(event.target.value));
  };

  const onConfirm = () => {
    const entry: StocksChangeInterface = {
      id: stocksChange.slice(-1)[0].id + 1,
      product_id: parseInt(name),
      quantity: movement,
      date: currentDateService.getCurrentDate(),
    };

    databaseService.pushStocksChange(entry);
    setStocksChange(databaseService.db.stocks_change);

    callback();
    switchModal();
    resetModal();
  };

  useEffect(() => {
    setProducts(databaseService.db.products);
    setStocksChange(databaseService.db.stocks_change);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button onClick={switchModal} variant="contained" color="success">
        New stock
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
            <InputLabel htmlFor="movement">Movement</InputLabel>
            <Input
              id="movement"
              type="number"
              value={movement}
              onChange={handleMovementChange}
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
