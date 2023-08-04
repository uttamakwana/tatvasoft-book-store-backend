import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnection.js";
import userRoutes from "./routes/user.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// this will parse the object into json and we can get the data from the request body
app.use(express.json());

// this will allow to any CORS to access database
app.use(cors());

// routes
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

dbConnect();
