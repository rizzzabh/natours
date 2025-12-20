const mongoose = require("mongoose");
const slugify = require("slugify");

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
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
// runs on save() and create() command , not on insertMany() ;

TourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  //console.log(this);
  next();
});

/// TourSchema.post("save" , function(doc , next)){}

const Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
