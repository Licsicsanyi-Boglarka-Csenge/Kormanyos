import express from "express";
import cors from "cors";
import env from "dotenv";
import usersRoutes from "./routes/usersRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";

env.config();

const PORT = 5000; //process.env.PORT ||
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/projects", projectsRoutes);

app.listen(PORT, () => {
  console.log(`Server run on port http://localhost:${PORT}`);
});
