// const fs = require("fs");

// const data = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

const Tour = require(`${__dirname}/../models/tourModel.js`);
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
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

exports.getAllTours = catchAsync(async (req, res, next) => {
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
});

exports.getTour = catchAsync(async (req, res, next) => {
  const currentTour = await Tour.findById(req.params.id);

  if (!currentTour) {
    return next(new AppError("this tour is not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: currentTour,
    },
  });
});

exports.addTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: null,
        avgRating: { $avg: "ratingsAverage" },
        avgPrice: { $avg: "price" },
        minPrice: { $min: "price" },
        maxPrice: { $max: "price" },
      },
    },
    {
      $sort: {
        avgPrice: 1,
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      stats: stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      plan: plan,
    },
  });
});
