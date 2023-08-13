import { app } from "./app.js";
import { dbConnect } from "./config/dbConnection.js";

dbConnect();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
