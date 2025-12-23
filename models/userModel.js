const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validate.isEmail, "this is an invalid email"],
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        //this works only on save  or create;
        validator: function (el) {
          return el == this.password;
        },
      },
    },
    photo: {
      type: String,
    },
  },
  []
);

userSchema.pre("save", async function (next) {
  // this keyword is used , so user function declaration , not expression

  if (!this.isModified(password)) return next();

  this.password = await bcrypt.hash(password, 12);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
