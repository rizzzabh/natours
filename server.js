const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `./config.env` });
const app = require("./app");

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("Database connection successful.");
  });

const PORT = process.env.PORT_NUMBER;

app.listen(PORT, () => {
  console.log(`App running on port : ${PORT} number :) `);
});
