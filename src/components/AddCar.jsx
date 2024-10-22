import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function AddCar({ fetchCars }) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: 0,
    price: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            handleSubmit(event);
            handleClose();
            fetchCars();
          },
        }}
      >
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="brand"
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={car.brand}
          />
          <TextField
            required
            margin="dense"
            id="model"
            name="model"
            label="Model"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={car.model}
          />
          <TextField
            required
            margin="dense"
            id="color"
            name="color"
            label="Color"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={car.color}
          />
          <TextField
            required
            margin="dense"
            id="fuel"
            name="fuel"
            label="Fuel"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={car.fuel}
          />
          <TextField
            required
            margin="dense"
            id="modelYear"
            name="modelYear"
            label="Year"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={car.modelYear}
          />
          <TextField
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={car.price}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;
