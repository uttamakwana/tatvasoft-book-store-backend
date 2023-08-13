// imports:-
// importing jwt for creating a token that will pass into a cookie
import jwt from "jsonwebtoken";

const cookieGenerator = (user, res, message, statusCode) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
  console.log(token, user._id);
  res
    .status(statusCode)
    .cookie("cookie", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
      secure: false
    })
    .json({ success: true, message: message });
};

export default cookieGenerator;
