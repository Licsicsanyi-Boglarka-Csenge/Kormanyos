import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Users from "../data/users.js";
import env from "dotenv";

env.config();

export const getAllUsers = (req, res) => {
  const users = Users.getAllUsers();
  res.json(users);
};

export const getUsersById = (req, res) => {
  const user = Users.getUsersById(+req.user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.json(user);
};

export const getUsersByEmail = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Missing data!" });
  }
  const user = Users.getUsersByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.json(user);
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }
  const user = Users.getUsersByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }
  if (!bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const sec = Math.floor((midnight - now) / 1000);

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: `${sec}s`,
    }
  );
  res.json({ token, user_id: user.id });
};

export const saveUser = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing data!" });
  }
  const salt = bcrypt.genSaltSync();
  const hashed_password = bcrypt.hashSync(password, salt);
  const saved = Users.saveUser(name, email, hashed_password);
  const user = Users.getUsersById(saved.lastInsertRowid);
  res.json(user);
};

export const updateUser = (req, res) => {
  const id = +req.params.id;
  let user = Users.getUsersById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing data!" });
  }
  const salt = bcrypt.genSaltSync();
  const hashed_password = bcrypt.hashSync(password, salt);
  Users.updateUser(
    id,
    name || user.name,
    email || user.email,
    password || hashed_password
  );
  user = Users.getUsersById(id);
  res.json(user);
};

export const deleteUser = (req, res) => {
  const id = +req.params.id;
  const user = Users.getUsersById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  Users.deleteUser(id);
  delete req.user_id;
  delete req.headers.authorization;
  res.json({ message: "Delete success!" });
};
