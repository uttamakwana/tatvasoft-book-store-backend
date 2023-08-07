import bcrypt from "bcrypt";
import { User } from "../schema/User.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email);

    let user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(401).json({ message: "User already exits!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      console.log(user);

      res.status(200).json({
        message: "Registration successfull!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "API error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User doesn't exits!",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(403)
        .json({ message: "email or password may be wrong!" });
    }

    return res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    res.status(401).json({ error });
  }
};
