import express from "express";
import "dotenv/config";
import "./config/dbConfig.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, console.log(`running in port ${PORT}`));
