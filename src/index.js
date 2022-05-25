require("dotenv").config();

const app = require("express")();
const path = require("path");

require("./config/dbConfig");

app.get("/", (req, res) => {
  res.send(`<h1>Estoy funcionando</h1>`);
});

app.listen(
  process.env.PORT,
  console.log(`running in port ${process.env.PORT}`)
);
