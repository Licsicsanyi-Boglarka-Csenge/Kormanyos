import { Router } from "express";
import { auth } from "../util/auth.js";
import * as tasksControllers from "../controllers/tasksControllers.js";

const router = Router();

router.get("/", auth, tasksControllers.getAllTasks)
router.get("/assignee/:id", auth, tasksControllers.getTasksByAssignee);
router.get("/project/:id", auth, tasksControllers.getTasksByProject);
router.get("/:id", auth, tasksControllers.getTaskById);
router.post("/", auth, tasksControllers.saveTask);
router.put("/:id", auth, tasksControllers.updateTask);
router.delete("/:id", auth, tasksControllers.deleteTask);

export default router;
