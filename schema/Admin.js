import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required!"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("admins", Schema);
