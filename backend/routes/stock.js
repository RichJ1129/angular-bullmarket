const express = require("express");
const jwt = require("jsonwebtoken");
const Stock = require("../models/stock");
const router = express.Router();

router.get("", (req, res, next) => {
  const stockQuery = Stock.find();
  let fetchedStocks;
  stockQuery
    .then(documents => {
      fetchedStocks = documents;
      return Stock.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Stocks fetched successfully!",
        stocks: fetchedStocks,
        maxStocks: count
      });
    });
});


module.exports = router;
