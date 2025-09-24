import { Router } from "express";
import * as db from "../util/database.js";
import * as carControllers from "../controllers/carsControllers.js";

const router = Router();

router.get("/", carControllers.getAllCars);
router.get("/:id", carControllers.getCarById);
router.post("/", carControllers.saveCar);
router.put("/:id", carControllers.updateCar);
router.delete("/:id", carControllers.deleteCar);

export default router;
