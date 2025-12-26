const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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
      select: false,
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
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    roles: {
      type: [String],
      enum: ["user", "guide", "lead-guide", "admin"],
      default: ["user"],
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: true,
  }
);

userSchema.pre("save", async function (next) {
  // this keyword is used , so user function declaration , not expression

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  console.log(resetToken, this.passwordResetToken);

  return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
