const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true, // unique -> will create an index in mongoose
      match: [/[a-z0-9]+@[a-z0-9]+/, "user email is not valid!"], // simple check
    },
    password: {
      type: String,
      minLength: [6, "password should be at least 6 characters long"],
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
    versionKey: false,
  }
);

schema.pre("save", async function () {
  console.log("pre save", this);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
});

const User = mongoose.model("user", schema);

module.exports = {
  User,
};
