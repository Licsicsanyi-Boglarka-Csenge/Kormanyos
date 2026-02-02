import * as Controller from "../controllers/numbersController.js";
import { Router } from "express";

const router = Router();

router.get("/", Controller.GetAllNumbers);
router.get("/:id", Controller.GetNumbersById);
router.post("/", Controller.SaveNumbers);

export default router;
