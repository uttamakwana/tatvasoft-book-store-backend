import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Username is required!"],
    },
    lastName: {
      type: String,
      required: [true, "Username is required!"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required!"],
    },
    password: {
      type: String,
      required: [true, "Username is required!"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", Schema);
