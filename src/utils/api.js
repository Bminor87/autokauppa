const postCar = async (car) => {
  await fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
};

const putCar = async (car) => {
  await fetch(car._links.self.href, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
};

const deleteCar = async (url) => {
  const options = {
    method: "DELETE",
  };

  if (window.confirm("Are you sure you want to delete this car?")) {
    return await fetch(url, options);
  }
};

export { postCar, putCar, deleteCar };
