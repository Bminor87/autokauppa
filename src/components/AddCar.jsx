import React, { useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import CarDialogContent from "./CarDialogContent";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCar } from "../utils/api";

function AddCar() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: 0,
    price: 0,
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: postCar,
    onSuccess: queryClient.invalidateQueries("cars"),
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
            event.preventDefault();
            addMutation.mutate(car);
            handleClose();
          },
        }}
      >
        <DialogTitle>New Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;
