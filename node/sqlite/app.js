import express from "express";
import cors from "cors";
import carsRoutes from "./routes/carsRoutes.js";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/cars", carsRoutes);

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
