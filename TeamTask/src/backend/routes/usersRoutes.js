import { Router } from "express";
import { auth } from "../util/auth.js";
import * as usersControllers from "../controllers/usersConrollers.js";

const router = Router();

router.get("/:id", auth, usersControllers.getUsersById);
router.post("/search", auth, usersControllers.getUsersByEmail);
router.post("/register", usersControllers.saveUser);
router.post("/login", usersControllers.loginUser);
// router.get("/", auth, usersControllers.getAllUsers);
router.patch("/:id", auth, usersControllers.updateUser);
router.delete("/:id", auth, usersControllers.deleteUser);

export default router;