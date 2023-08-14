import jwt from "jsonwebtoken";
import ErrorHanlder from "./errorHanlder.js";
import { Admin } from "../schema/Admin.js";

const isAdminAuth = async (req, res, next) => {
  const { authToken } = req.cookies;
  console.log(req.cookies);
  if (!authToken) {
    return next(new ErrorHanlder("Login first!", 403));
  }

  const decodedUser = jwt.verify(authToken, process.env.SECRET_KEY);
  req.user = await Admin.findById(decodedUser._id);
  next();
};

export default isAdminAuth;
