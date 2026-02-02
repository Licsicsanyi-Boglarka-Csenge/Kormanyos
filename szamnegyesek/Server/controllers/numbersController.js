import { json } from "express";
import * as Data from "../data/db.js";

export const GetAllNumbers = (req, res) => {
  const allNumbers = Data.GetAllNumbers();
  res.json(allNumbers);
};

export const GetNumbersById = (req, res) => {
  const numbers = Data.GetNumbersById(+req.params.id);
  if (!numbers) {
    return res.status(404).json({ message: "Numbers not found" });
  }
  res.json(numbers);
};

export const SaveNumbers = (req, res) => {
  const { numbers } = req.body;
  if (!numbers || numbers.length == 0) {
    return res.status(400).json({ message: "Missing data!" });
  }
  if (numbers.length < 4 || numbers.length > 4) {
    return res.status(400).json({ message: "Invalid data!" });
  }
  const allNumbers = Data.GetAllNumbers();
  const exisits = allNumbers.some((x) => x.numbers === JSON.stringify(numbers));
  if (exisits) {
    return res.status(409).json({ message: "Invalid data!" });
  }
  const saved = Data.SaveNumbers(JSON.stringify(numbers));
  const savedNumbers = Data.GetNumbersById(saved.lastInsertedRow);
  res.json(savedNumbers);
};
