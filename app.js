import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnection.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorHanlder.js";

export const app = express();
// to have access of enviroment variables in our backend
dotenv.config();

// middlewares:-
// express.json will parse the req and we can destruct the req.body using it
app.use(express.json());
// cookieParser will parse the cookie from the requeset
app.use(cookieParser());
// cors
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);



app.use(errorMiddleware);
