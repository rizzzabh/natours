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

exports.aliasTopTours = async (req, res, next) => {
  req.query.sort = "-ratingsAverage";

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const queryObject = req.query;
    const excludedFields = ["sort", "page", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObject[el]);

    let query = Tour.find(queryObject);

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    query.skip((page - 1) * limit).limit(limit);
    const tours = await query;
    res.status(200).json({
      status: "success",
      data: {
        tour: tours,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.getTour = async (req, res) => {
  try {
    const currentTour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        tour: currentTour,
      },
    });
  } catch (error) {}
};

exports.addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "failed to add tour ", message: error });
  }
};
