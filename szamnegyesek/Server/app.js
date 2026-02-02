import express from "express"
import cors from "cors"
import routes from "./routes/numbersRoutes.js"

const PORT = 3000;
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/fours", routes)

app.listen(PORT, ()=>{
    console.log(`Server runs on port ${PORT}!`)
})