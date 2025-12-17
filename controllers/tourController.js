// const fs = require("fs");

// const data = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

const Tour = require(`${__dirname}/../models/tourModel.js`);

// exports.checkBody = (req, res, next) => {
//   const requestBody = req.body;

//   if (requestBody.name && requestBody.price) {
//     next();
//   } else {
//     return res.status(400).send("bad request");
//   }
// };

exports.getAllTours = (req, res) => {
  res.status(200).send({
    status: "success",
    tour: data,
  });
};

exports.getTour = (req, res) => {};

exports.addTour = (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("done");
};
