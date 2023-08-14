import bcrypt from "bcrypt";
import { Admin } from "../schema/Admin.js";
import generateCookie from "../utils/cookieGenerator.js";
import ErrorHanlder from "../middlewares/errorHanlder.js";
import { User } from "../schema/User.js"
import ErrorHandler from "../middlewares/errorHanlder.js";

// POST
// REGISTER API
// desc: admin will register through this API
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // console.log(firstName, lastName, email);

    let admin = await Admin.findOne({ email });
    // console.log(admin);

    if (admin) {
      // return res.status(401).json({ message: "Admin already exits!" });
      return next(
        new ErrorHanlder("Admin already exists! Use another email!", 402)
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await Admin.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      // console.log(admin);

      res.status(200).json({
        message: "Registration successfull!",
      });
    }
  } catch (error) {
    // console.log(error);
    // res.json({ message: "API error", error });
    return next(
      new ErrorHanlder("Somewhere problem in database admin creation!", 500)
    );
  }
};

// POST
// LOGIN API
// desc: admin will login through this API
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });

    if (!admin) {
      // return res.status(401).json({
      //   message: "Admin doesn't exits!",
      // });
      return next(new ErrorHanlder("Admin doesn't exists!", 401));
    }

    const checkPassword = await bcrypt.compare(password, admin.password);

    if (!checkPassword) {
      //   return res
      //     .status(403)
      //     .json({ message: "email or password may be wrong!" });
      return next(new ErrorHanlder("email or password may be wrong", 403));
    }

    generateCookie(admin, res, "Login successfull", 201, req);
    console.log("login API")
    console.log(req.cookies);
    // return res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    // res.status(401).json({ error });
    return next(new ErrorHanlder(error, 401));
  }
};

export const me = async (req, res, next) => {
  try {
    console.log("me API")
    console.log(req.cookies);
    const { email } = req.body;
    // const admin = req.body;
    // let admin = await Admin.findById({ email })
    let admin = await Admin.findOne({ email });
    console.log(admin);
    if (!admin) {
      return next(new ErrorHanlder("Admin does not exits!", 402));
    }
    // res.json({ success: true, admin })
    res.json({ sucess: true, data: admin })
  }
  catch (error) {
    next(new ErrorHanlder("Server side problem", 501));
  }
}

export const  userlist = async (req, res, next) => {
  const users = await User.find({});
  if (!users) {
    return next(new ErrorHandler("User list not found!"));
  }

  res.json({ success: true, data: users });
}

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  // let user = await User.findById({ id });
  let user = await User.deleteOne({ _id: id });

  console.log(id);
  console.log(user);
  res.json({ success: true, data: user })
}