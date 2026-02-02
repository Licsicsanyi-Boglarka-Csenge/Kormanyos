import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS fourNumbers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numbers TEXT
  )`,
).run();

export const GetAllNumbers = () =>
  db.prepare(`SELECT * FROM fourNumbers`).all();
export const GetNumbersById = (id) =>
  db.prepare(`SELECT * FROM fourNumbers WHERE id = ?`).get(id);
export const SaveNumbers = (numbers) =>
  db.prepare(`INSERT INTO fourNumbers (numbers) VALUES (?)`).run(numbers);

export default db;
