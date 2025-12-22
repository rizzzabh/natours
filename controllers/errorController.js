module.exports = (err, req, res, next) => {
  errStatusCode = err.statusCode || 500;
  errStatus = err.status || "fail";
  res.status(errStatusCode).json({
    status: errStatus,
    message: err.message,
  });
};
