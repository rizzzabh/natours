const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    rating: Number,
    duration: {
      type: String,
    },
    ratingsAverage: Number,
    ratingsQuantity: Number,
    priceDiscount: Number,
    summary: String,
    maxGroupSize: {
      type: Number,
    },
    difficulty: Number,
    description: String,
    price: {
      type: Number,
      required: true,
    },
    imageCover: {
      type: String,
    },
    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
