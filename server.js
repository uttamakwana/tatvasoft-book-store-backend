import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnection.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorHanlder.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// this will parse the object into json and we can get the data from the request body
app.use(express.json());

// this will allow to any CORS to access database
app.use(cors());

// cookieParser will parse the cookie from the requeset
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

dbConnect();


app.use(errorMiddleware);