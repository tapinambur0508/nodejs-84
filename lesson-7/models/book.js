const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    // title: String,
    // author: String,
    // year: Number,
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      default: 2000,
    },
    genre: {
      type: String,
      enum: [
        "Action",
        "Biography",
        "History",
        "Horror",
        "Kids",
        "Learning",
        "Sci-Fi",
      ],
      default: "Action",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
