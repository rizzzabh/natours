const fs = require("fs");
const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const globalError = require("./controllers/errorController");

app.use(express.json());
//middlewares
// app.use((req, res, next) => {
//   console.log("hello from the middleware.");
//   next();
// });
// app.use((req, res, next) => {
//   debugger; // stops on EVERY request
//   next();
// });
//app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server side . " });
});

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  error = new AppError(
    404,
    "failed to load this page , as this was non existent"
  );
  next(error);
});

app.use(globalError);

module.exports = app;
