import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCar from "./AddCar";
import "./CarList.css";

function CarList() {
  const [cars, setCars] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "brand" },
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
      cellRenderer: (params) => (
        <Button onClick={() => deleteCar(params.data._links.self.href)}>
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

  const fetchCars = async () => {
    try {
      const response = await fetch(
        "https://car-rest-service-carshop.2.rahtiapp.fi/cars"
      );
      const data = await response.json();
      console.log(data);
      setCars(data._embedded.cars);
    } catch (error) {
      console.error("Error when fetching cars:", error);
    }
  };

  const deleteCar = async (url) => {
    if (!window.confirm("Are you sure you want to delete this car?")) {
      return;
    }

    const options = {
      method: "DELETE",
    };
    try {
      await fetch(url, options);
      fetchCars();
    } catch (error) {
      console.error("Error when trying to delete car", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="carList">
      <AddCar fetchCars={fetchCars} />
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
