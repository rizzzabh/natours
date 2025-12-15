const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server side . " });
});

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id;
  const tour = data.find((el) => el.id == id);
  res.status(200).send({
    status: "success",
    tour: tour,
  });
});

app.post("/api/v1/tours", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("done");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port : ${PORT} number :) `);
});
