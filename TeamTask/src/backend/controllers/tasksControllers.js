import * as Tasks from "../data/tasks.js";

export const getAllTasks = (req, res) => {
  const tasks = Users.getAllTasks();
  res.json(tasks);
};

export const getTaskById = (req, res) => {
  const task = Tasks.getTasksById(+req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found!" });
  }
  res.json(task);
};

export const getTasksByProject = (req, res) => {
  const tasks = Tasks.getTaskByProject(+req.params.id);
  if (!tasks || tasks.length === 0)
    return res.status(404).json({ message: "Tasks not found!" });
  res.json(tasks);
};

export const getTasksByAssignee = (req, res) => {
  const tasks = Tasks.getTaskByUser(+req.params.id);
  if (!tasks || tasks.length === 0) {
    return res.status(404).json({ message: "Tasks not found!" });
  }
  res.json(tasks);
};

export const saveTask = (req, res) => {
  const { title, description, due_date, project_id, assignee_id, status } =
    req.body;
  console.log(title, description, due_date, project_id, assignee_id);
  if (
    !title ||
    !description ||
    !due_date ||
    !project_id ||
    !assignee_id ||
    !status
  ) {
    return res.status(400).json({ message: "Missing data!" });
  }

  const saved = Tasks.saveTask(
    project_id,
    assignee_id,
    title,
    description,
    status,
    due_date
  );
  const task = Tasks.getTasksById(saved.lastInsertRowid);
  res.json(task);
};

export const updateTask = (req, res) => {
  const id = +req.params.id;
  let task = Tasks.getTasksById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found!" });
  }
  const { title, description, due_date, project_id, assignee_id, status } =
    req.body;
  if (
    !title ||
    !description ||
    !due_date ||
    !project_id ||
    assignee_id ||
    status
  ) {
    return res.status(400).json({ message: "Missing data!" });
  }
  Tasks.updateTask(
    id,
    project_id,
    assignee_id,
    title || task.title,
    description || task.description,
    status || task.status,
    due_date || task.due_date
  );
  task = Tasks.getTaskById(id);
  res.json(task);
};

export const deleteTask = (req, res) => {
  const id = +req.params.id;
  const task = Tasks.getTasksById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found!" });
  }
  Tasks.deleteTask(id);
  res.json({ message: "Delete success!" });
};
