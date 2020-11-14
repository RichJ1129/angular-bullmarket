const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const stockRoutes = require("./routes/stock");
const companyRoutes = require("./routes/company");
const commodityRoutes = require("./routes/commodity");
const bondRoutes = require("./routes/bond");
const investmentRoutes = require("./routes/investment");
const currencyRoutes = require('./routes/currency');
const realestateRoutes = require('./routes/realestate');


const app = express();
mongoose
  .connect(
    process.env.MONGO_ATLAS //Replace with mongo database url if running locally
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'angular-bullmarket')));

//May have to uncomment when running locally

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/commodities", commodityRoutes);
app.use("/api/bonds", bondRoutes);
app.use("/api/investment", investmentRoutes);
app.use("/api/currency", currencyRoutes);
//app.use("/api/realestate", realestateRoutes);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'angular-bullmarket/index.html'));
});

module.exports = app;
