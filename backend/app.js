const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

const app = express();
mongoose
  .connect(
    "mongodb+srv://josephri:" + process.env.MONGO_ATLAS_PW + "@cluster0.murwd.mongodb.net/bull_market?retryWrites=true&w=majority" //Replace with mongo database url if running locally
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'angular-bullmarket')));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

app.use("/api/user", userRoutes);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'angular-bullmarket/index.html'));
});

module.exports = app;
