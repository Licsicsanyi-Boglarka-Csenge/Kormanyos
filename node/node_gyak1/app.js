import express, { json } from "express";

const PORT = 3000;
const app = express();
app.use(json.express());

let books = [
  { id: 1, author: "Anna", title: "al" },
  { id: 2, author: "Ben", title: "bl" },
  { id: 3, author: "Cloe", title: "cl" },
  { id: 4, author: "Dave", title: "dl" },
];

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost: ${PORT}`);
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => book.id === id);
  res.status(200).json(book);
});

app.post("/books", (req, res) => {
  const { author, title } = req.body;
  if (!author || !title) res.status(400).json({ message: "Missing data!" });

  const id = books[books.length - 1]?.id + 1;
  book = { id, author, title };
  books.push(book);
  res.status(201).json(book);
});

app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  let book = books.find((book) => book.id === id);

  if (!book) return res.status(404).json({ message: "Book not found!" });

  const { author, title } = req.body;
  if (!author || !title) res.status(400).json({ message: "Missing data!" });

  const index = books.indexOf(book);
  book = { id, author, title };
  books[index] = book;
  res.status(200).json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => book.id === id);

  if (!book) return res.status(404).json({ message: "Book not found!" });

  const index = books.indexOf(book);
  books.splice(index, 1);
  res.status(200).json({ message: "Deleted succesful!" });
});
