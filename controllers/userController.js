const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).send({
    status: "success",
    data: {
      users,
    },
  });
});
exports.addUser = (req, res) => {
  res.status(200).send({ message: "This route is not yet defined" });
};
exports.getUser = (req, res) => {
  res.status(200).send({ message: "This route is not yet defined" });
};
