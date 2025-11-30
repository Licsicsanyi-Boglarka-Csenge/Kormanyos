import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password_hash TEXT
    )`
).run();

// export const getAllUsers = () => db.prepare("SELECT * FROM users").all();

export const getUsersById = (id) =>
  db.prepare("SELECT * FROM users WHERE id = ?").get(id);

export const getUsersByEmail = (email) =>
  db.prepare("SELECT * FROM users WHERE email = ?").get(email);

export const saveUser = (name, email, password_hash) =>
  db
    .prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)")
    .run(name, email, password_hash);

export const updateUser = (id, name, email, password_hash) =>
  db
    .prepare(
      "UPDATE users SET name = ?, email = ?, password_hash = ? WHERE id = ?"
    )
    .run(name, email, password_hash, id);

export const deleteUser = (id) =>
  db.prepare("DELETE FROM users WHERE id = ?").run(id);