const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: Number,
    tours: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
    },
    users: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Review = mongoose.model("Review", ReviewSchema);
