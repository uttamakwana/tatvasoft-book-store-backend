import bcrypt from "bcrypt";
import { User } from "../schema/User.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    console.log(firstName, lastName);

    let user = await User.findOne({ username });

    if (user) {
      return res.status(401).json({ message: "User already exits!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Registration successfull!",
    });
  } catch (error) {
    res.json({ error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "User doesn't exits in database. Please first register",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(403)
        .json({ message: "username or password may be wrong" });
    }

    return res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    res.status(401).json({ error });
  }
};
