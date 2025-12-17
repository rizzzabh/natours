const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rating: Number,
  price: {
    type: Number,
    required: true,
  },
});
const Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
