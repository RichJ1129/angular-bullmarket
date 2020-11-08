const express = require("express");
const jwt = require("jsonwebtoken");
const Currencies = require("../models/currency");
const router = express.Router();

//Method to get all the currencies in the database.
router.get("",(req, res) => {
  Currencies.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Method to get a single stock in database.
router.get("/:ticker", (req, res, next) => {
  Stock.findOne({symbol: req.params.ticker.toUpperCase()}).then( stock => {
    if (stock) {
      res.status(200).json(stock);
    } else {
      res.status(404).json({ message: "Stock not found!" });
    }
  });
});


module.exports = router;
