import bcrypt from "bcrypt";
import { User } from "../schema/User.js";
import generateCookie from "../utils/cookieGenerator.js";
import ErrorHanlder from "../middlewares/errorHanlder.js";

// POST 
// REGISTER API
// desc: user will register through this API
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // console.log(firstName, lastName, email);

    let user = await User.findOne({ email });
    // console.log(user);

    if (user) {
      // return res.status(401).json({ message: "User already exits!" });
      return next(new ErrorHanlder("User already exists! Use another email!", 402));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      // console.log(user);

      res.status(200).json({
        message: "Registration successfull!",
      });
    }
  } catch (error) {
    // console.log(error);
    // res.json({ message: "API error", error });
    return next(
      new ErrorHanlder("Somewhere problem in database user creation!", 500)
    );
  }
};

// POST
// LOGIN API
// desc: user will login through this API
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      // return res.status(401).json({
      //   message: "User doesn't exits!",
      // });
      return next(new ErrorHanlder("User doesn't exists!", 401));
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      //   return res
      //     .status(403)
      //     .json({ message: "email or password may be wrong!" });
      return next(new ErrorHanlder("email or password may be wrong", 403));
    }

    generateCookie(user, res, "Login successfull", 201);
    // return res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    // res.status(401).json({ error });
    return next(new ErrorHanlder(error, 401));
  }
};

export const me = async (req, res, next) => {
  res.status(202).json({ message: "Me API is working properly!" });
};
