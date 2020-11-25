const express = require("express");
const jwt = require("jsonwebtoken");
const Commodity = require("../models/commodity");
const router = express.Router();

//Method to get all the commodities in your database. No duplicate commodities so query can be just be a find.
router.get("",(req, res) => {
  Commodity.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Method to get a single Commodity in the database.
router.get("/:symbol", (req, res, next) => {
  Commodity.findOne({symbol: req.params.symbol.toUpperCase()}).then( commodity => {
    if (commodity) {
      res.status(200).json(commodity);
    } else {
      res.status(404).json({ message: "Commodity not found!" });
    }
  });
});

module.exports = router;
