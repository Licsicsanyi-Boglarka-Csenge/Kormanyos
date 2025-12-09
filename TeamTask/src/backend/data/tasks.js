import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    assignee_id INTEGER,
    title TEXT,
    description TEXT,
    status TEXT,
    due_date DATE,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (assignee_id) REFERENCES users(id)
    )`
).run();

export const getAllTasks = () => db.prepare("SELECT * FROM tasks").all();

export const getTasksById = (id) =>
  db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

export const getTaskByProject = (project_id) =>
  db.prepare("SELECT * FROM tasks WHERE project_id = ?").all(project_id);

export const getTaskByUser = (assignee_id) =>
  db.prepare("SELECT * FROM tasks WHERE assignee_id = ?").all(assignee_id);

export const saveTask = (
  project_id,
  assignee_id,
  title,
  description,
  status,
  due_date
) =>
  db
    .prepare(
      "INSERT INTO tasks (project_id, assignee_id, title, description, status, due_date) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(project_id, assignee_id, title, description, status, due_date);

export const updateTask = (
  id,
  project_id,
  assignee_id,
  title,
  description,
  status,
  due_date
) =>
  db
    .prepare(
      "UPDATE tasks SET project_id = ?, assignee_id = ?, title = ?, description = ?, status = ?, due_date = ? WHERE id = ?"
    )
    .run(project_id, assignee_id, title, description, status, due_date, id);

export const updateStatus = (id, status) =>
  db.prepare("UPDATE tasks SET status = ? WHERE id = ?").run(status, id);

export const deleteTask = (id) =>
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
