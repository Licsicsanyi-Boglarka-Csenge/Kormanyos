import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite");

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    email STRING, 
    password STRING
  )`
).run();

//Lekérdezi az összes felhasználót (GetAll) => tömb 
export const getAllUsers = () => db.prepare("SELECT * FROM users ").all();

//Create user
export const CreateUser = (email, password) => db.prepare("INSERT INTO users (email, password) VALUES (?,?)").run(email, password)





