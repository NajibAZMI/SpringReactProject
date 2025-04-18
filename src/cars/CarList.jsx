import React from "react";
import CarCart from "./CarCart";
const cars = [
  {
    brand: "Mercedes-Benz",
    model: "Citan",
    body: "van",
    color: "red",
    price: "10000$",
    year: 2010,
  },
  {
    brand: "Toyota",
    model: "Corolla",
    body: "sedan",
    color: "blue",
    price: "8500$",
    year: 2012,
  },
  {
    brand: "BMW",
    model: "X5",
    body: "SUV",
    color: "black",
    price: "15000$",
    year: 2015,
  },
  {
    brand: "Volkswagen",
    model: "Golf",
    body: "hatchback",
    color: "white",
    price: "9500$",
    year: 2013,
  },
  {
    brand: "Audi",
    model: "A4",
    body: "sedan",
    color: "grey",
    price: "12000$",
    year: 2014,
  },
];

export default function CarList() {
  const displayCars = () => {
    return cars.map((car, index) => {
      return <CarCart key={index} {...car} />;
    });
  };
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <ul className="nav navbar-nav">
        {displayCars()}
        </ul>
      </nav>
     
    </>
  );
}
