const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/db");
const GameRoute = require("./routes/GameRoute");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
require("dotenv").config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/game", GameRoute);

mongoose
  .connect(dbConfig.url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connecttion is succesful and an app is listening at the port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("Error thrown => " + error);
  });
