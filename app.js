const fs = require("fs");
const express = require("express");
const app = express();

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
  res.status(404).json({
    status: "fail",
    message: "page requested not found",
  });
});

module.exports = app;
