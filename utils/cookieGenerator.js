// imports:-
// importing jwt for creating a token that will pass into a cookie
import jwt from "jsonwebtoken";

const cookieGenerator = (user, res, message, statusCode, req) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
  // console.log(token, user._id);
  console.log("token");
  console.log(token);

  console.log("admin id");
  console.log(user._id.toString());
  res
    .status(statusCode)
    .cookie("authToken", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, message: message });

  console.log("cookie");
  console.log(Math.round(Math.random() * 100), "number");
  console.log(req.cookies);
};

export default cookieGenerator;
