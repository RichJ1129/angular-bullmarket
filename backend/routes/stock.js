const express = require("express");
const jwt = require("jsonwebtoken");
const Stock = require("../models/stock");

const router = express.Router();

router.post("/post_stocks", (req, res, next) => {
  const stock = new Stock({
    stockName: req.body.stockName,
    symbol: req.body.symbol,
    price: req.body.price,
    marketCap: req.body.marketCap
  });
  stock.save().then(
    result => {
      res.status(201).json({
        message: "Stock Created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
