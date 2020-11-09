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

//Method to get a single currency in database.
router.get("/:ticker", (req, res, next) => {
  Currencies.findOne({ticker: req.params.ticker.toUpperCase()}).then( currency => {
    if (currency) {
      res.status(200).json(currency);
    } else {
      res.status(404).json({ message: "Currency not found!" });
    }
  });
});


module.exports = router;
