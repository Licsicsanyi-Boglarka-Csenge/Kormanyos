import * as Projects from "../data/projects.js";

export const getAllProjects = (req, res) => {
  const projects = Projects.getAllProjects();
  res.json(projects);
};

export const getProjectsById = (req, res) => {
  const project = Projects.getProjectById(+req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found!" });
  }
  res.json(project);
};

export const getProjectsByOwner = (req, res) => {
  const projects = Projects.getProjectsByOwnerId(req.user_id);
  if (!projects || projects.length === 0) {
    return res.status(404).json({ message: "Projects not found!" });
  }
  res.json(projects);
};

export const saveProject = (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "Missing data!" });
  }
  const saved = Projects.saveProject(req.user_id, name, description);
  const project = Projects.getProjectById(saved.lastInsertRowid);
  res.json(project);
};

export const updateProject = (req, res) => {
  const id = +req.params.id;
  let project = Projects.getProjectById(id);
  if (!project) {
    return res.status(404).json({ message: "Missing project!" });
  }
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "Missing data!" });
  }
  Projects.updateProject(
    id,
    project.owner_id,
    name || project.name,
    description || project.description
  );
  project = Projects.getProjectById(id);
  res.json(project);
};

export const deleteProject = (req, res) => {
  const id = +req.params.id;
  const project = Projects.getProjectById(id);
  if (!project) {
    return res.status(404).json({ message: "Project not found!" });
  }
  Projects.deleteProject(id);
  res.sendStatus(204);
};
// export const Project = (req, res) => {}
// export const Project = (req, res) => {}
