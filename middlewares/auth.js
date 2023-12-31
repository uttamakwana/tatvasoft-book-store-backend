import jwt from "jsonwebtoken";
import ErrorHanlder from "./errorHanlder.js";
import { User } from "../schema/User.js";

const isAuth = async (req, res, next) => {
  const { cookie } = req?.cookies;
  if (!cookie) {
    return next(new ErrorHanlder("Login first!", 403));
  }

  const decodedUser = jwt.verify(cookie, process.env.SECRET_KEY);
  req.user = await User.findById(decodedUser._id);
  next();
};

export default isAuth;
