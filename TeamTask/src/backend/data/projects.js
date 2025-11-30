import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS projects(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER,
    name TEXT,
    description TEXT,
    FOREIGN KEY (owner_id) REFERENCES users(id)
    )`
).run();

export const getAllProjects = () => db.prepare("SELECT * FROM projects").all();

export const getProjectById = (id) =>
  db.prepare("SELECT * FROM projects WHERE id = ?").get(id);

export const getProjectsByOwnerId = (owner_id) =>
  db.prepare("SELECT * FROM projects WHERE owner_id = ?").all(owner_id);

export const saveProject = (owner_id, name, description) =>
  db
    .prepare(
      "INSERT INTO projects (owner_id, name, description) VALUES (?, ?, ?)"
    )
    .run(owner_id, name, description);

export const updateProject = (id, owner_id, name, description) =>
  db
    .prepare(
      "UPDATE projects SET owner_id = ?, name = ?, description = ? WHERE id = ?"
    )
    .run(owner_id, name, description, id);

export const deleteProject = (id) =>
  db.prepare("DELETE FROM projects WHERE id = ?").run(id);
