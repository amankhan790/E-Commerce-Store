import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("Users", userSchema);

export default userModel;
