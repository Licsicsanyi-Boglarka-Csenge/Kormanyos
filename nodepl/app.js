import express from "express";
let users = [];
const port = 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Get" });
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/users", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) {
    return res.status(400).json({ message: "Nem megfelelő email!" });
  }
  if (!password) {
    return res.status(400).json({ message: "Nem megfelelő jelszó!" });
  }
  const user = { email, password };
  users.push(user);
  res.status(200).json(user);
});

app.put("/users/:id", (req, res) => {
  const id = +req.params.id;
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(400).json({ message: "Nem megfelelő email!" });
  }
  if (!password) {
    return res.status(400).json({ message: "Nem megfelelő jelszó!" });
  }

  const user = { email, password };
  users.splice(id, 1, user);
  res.status(200).json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  if (id < 0 && id >= users.length) {
    return res.status(400).json({ message: "Invalid id!" });
  }
  users.splice(id, 1);
  res.status(200).json({ message: "Data succsesful " + id });
});

app.listen(port, () => {
  console.log("Server runs on port " + port);
});
