import React, { useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import CarDialogContent from "./CarDialogContent";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putCar } from "../utils/api";

function UpdateCar({ currentCar }) {
  const [car, setCar] = useState(currentCar);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: putCar,
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
      <Button onClick={handleClickOpen}>Edit</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            updateMutation.mutate(car);
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

export default UpdateCar;
