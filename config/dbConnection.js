import mongoose from "mongoose";

export const dbConnect = async () => {
  const database = await mongoose.connect(process.env.MONGO_URL, {
    dbName: "tatvasoft-book-store",
  });

  console.log("Database connection successfull!");
  console.log("Host name:", database.connection.host);
  console.log("DB Name:", database.connection.name);
};
