import * as db from "../util/database.js";

export const getAllCars = (req, res) => {
  const cars = db.getAllCars();
  res.status(200).json(cars);
};

export const getCarById = (req, res) => {
  const car = db.getCarById(+req.params.id);
  if (!car) return res.status(404).json({ message: "Car not found!" });
  res.status(200).json(car);
};

export const saveCar = (req, res) => {
  const { brand, model } = req.body;
  if (!brand || !model)
    return res.status(400).json({ message: "Missing data!" });
  try {
    const save = db.saveCar(brand, model);
    const car = db.getCarById(save.lastInsertRowid);
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: message.error });
  }
};

export const updateCar = (req, res) => {
  const id = +req.params.id;
  let car = db.getCarById(id);
  if (!car) return res.status(404).json({ message: "Car not found!" });
  const { brand, model } = req.body;
  try {
    const updated = db.updateCar(id, brand || car.brand, model || car.model);
    car = db.getCarById(id);
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: message.error });
  }
};

export const deleteCar = (req, res) => {
  db.deleteCar(+req.params.id);
  res.status(200).json({ message: "Delete succes!" });
};
