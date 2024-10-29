import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCar from "./AddCar";
import UpdateCar from "./UpdateCar";
import "./CarList.css";

import { deleteCar } from "../utils/api";

function CarList() {
  // const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const response = await fetch(
      "https://car-rest-service-carshop.2.rahtiapp.fi/cars"
    );
    const data = await response.json();
    return data._embedded.cars;
  };

  const queryClient = useQueryClient();

  const { data: cars } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: queryClient.invalidateQueries("cars"),
  });

  const [columnDefs, setColumnDefs] = useState([
    { field: "brand", sort: "asc" },
    { field: "model" },
    { field: "color" },
    { field: "fuel" },
    { field: "modelYear", headerName: "Year" },
    { field: "price" },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filter: false,
      cellRenderer: (params) => <UpdateCar currentCar={params.data} />,
    },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <Button
          onClick={() => deleteMutation.mutate(params.data._links.self.href)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
  };

  const autoSizeStrategy = {
    type: "fitColumns",
  };

  return (
    <div className="carList">
      <AddCar />
      <div className="ag-theme-material" style={{ height: 800, width: "100%" }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </div>
  );
}

export default CarList;
