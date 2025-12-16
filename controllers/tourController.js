const fs = require("fs");

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).send({
    status: "success",
    tour: data,
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id;
  const tour = data.find((el) => el.id == id);
  res.status(200).send({
    status: "success",
    tour: tour,
  });
};

exports.addTour = (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("done");
};
