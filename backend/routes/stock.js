const express = require("express");
const jwt = require("jsonwebtoken");
const Stock = require("../models/stock");
const router = express.Router();

//Method to get all the stocks in database. No duplicate stocks so query can be just be a find.
router.get("",(req, res) => {
  Stock.find((error, data) => {
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
