import jwt from "jsonwebtoken";

const generateCookie = (user, res, message, statusCode) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
  console.log(token);
  res
    .status(statusCode)
    .cookie("cookie", token, {
      httpOnly: true,
      maxAge: 25 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({ success: true, message: message });
};

export default generateCookie;
