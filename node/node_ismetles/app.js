import express from "express";

const PORT = 3000;
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Anna", email: "anna@gmail.com", pasword: "anna" },
  { id: 2, name: "Bob", email: "bob@gmail.com", pasword: "bob" },
  { id: 3, name: "Cloe", email: "cloe@gmail.com", pasword: "cloe" },
  { id: 4, name: "Dave", email: "dave@gmail.com", pasword: "dave" },
];

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost: ${PORT}`);
});

//GET
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const id = +req.params.id;

  //const [user] = users.filter((user) => user.id === id);
  const user = users.find((user) => user.id === id);
  res.status(200).json(user);
});

//POST
app.post("/users", (req, res) => {
  /*const email = req.body.email
    const pasword = req.body.pasword*/
  const { name, email, pasword } = req.body;

  if (!name || !email || !pasword)
    return res.status(400).json({ message: "Missing data!" });

  const id = users[users.length - 1]?.id + 1;
  const user = { id, name, email, pasword };
  users.push(user);
  res.status(201).json(user);
});

//PUT
app.put("/users/:id", (req, res) => {
  const id = +req.params.id;
  let user = users.find((user) => user.id === id);

  if (!user) return res.status(404).json({ message: "User not found!" });

  const { name, email, pasword } = req.body;
  if (!name || !email || !pasword)
    return res.status(400).json({ message: "Missing data!" });

  const index = users.indexOf(user);
  user = { id, name, email, pasword };
  users[index] = user;
  res.status(200).json(user);
});

//DELETE
app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) return res.status(404).json({ message: "User not found!" });

  const index = user.indexOf(user);
  users.splice(index, 1);

  //user = users.find((user) => user.id !==id)
  res.status(200).json({ message: "Deleted succesful!" });
});

//PATCH
app.patch("/users:id", (req, res) => {
  const id = +req.params.id;
  let user = users.find((user) => user.id === id);

  if (!user) return res.status(404).json({ message: "User not found!" });

  const index = user.indexOf(user);
  const { name, email, pasword } = req.body;
  user = {
    id: user.id,
    name: name || user.name,
    email: email || user.email,
    pasword: pasword || user.pasword,
  };

  users[index] = user;
  res.status(200).json(user);
});
