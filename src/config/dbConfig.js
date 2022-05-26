import mongoose from "mongoose";

const URI = "mongodb://localhost:27017/yourdb";

mongoose.connect(process.env.MONGO_DB_URI || URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", () => console.error("Error in db connection"));

mongoose.connection.once("open", () => console.log("db connected"));
