import express from "express";
import "dotenv/config";
import "./config/dbConfig.js";
import authRouter from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/", authRouter);

app.listen(PORT, console.log(`running in port ${PORT}`));
