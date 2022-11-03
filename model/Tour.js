const mongoose = require("mongoose");
const TourSchema = mongoose.Schema(
  {
    place: {
      type: String,
      required: [true, "name required"],
      unique: true,
      trim: true,
      maxLength: [100, "maximum should have 100 letter"],
    },

    price: {
      type: Number,
      required: true,
      min: [0, "price cant be negetive"],
    },
    duration: {
      type: String,
      required: true,
      maxLength: [100, "maximum should have 100 letter"],
    },
    description: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("TourInfo", TourSchema);

module.exports = Tour;
