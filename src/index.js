const app = require("express")();
require("dotenv").config();

require("../config/dbconfig");

app.listen(
  process.env.PORT,
  console.log(`running in port ${process.env.PORT}`)
);
