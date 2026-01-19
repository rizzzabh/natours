const mongoose = require("mongoose");
const slugify = require("slugify");

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a tour must have a name"],
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
    priceDiscount: {
      type: Number,
      validate: function (val) {
        return val <= this.price;
      },
    },
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
    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
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

// Query Middleware ;
// TourSchem.pre("find" , function (next)) {}

// TourSchema.pre("aggregate" , function ()) {}

const Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
