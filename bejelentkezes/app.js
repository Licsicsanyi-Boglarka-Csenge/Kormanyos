import express from "express";
import * as db from "./util/database.js";
import cors from "cors";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  let users = db.getAllUsers();
  return res.status(200).json(users);
});

app.post("/users", (req, res) => {
  let { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing data!" });

  db.CreateUser(email, password);
  return res.status(201).json({ email, password });
});

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});
