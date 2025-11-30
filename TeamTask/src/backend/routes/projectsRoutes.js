import { Router } from "express";
import { auth } from "../util/auth.js";
import * as projectsControllers from "../controllers/projectsControllers.js";

const router = Router();

router.get("/", auth, projectsControllers.getAllProjects);
router.get("/owner", auth, projectsControllers.getProjectsByOwner);
router.get("/:id", auth, projectsControllers.getProjectsById);
router.post("/", auth, projectsControllers.saveProject);
router.patch("/:id", auth, projectsControllers.updateProject);
router.delete("/:id", auth, projectsControllers.deleteProject);

export default router;
