const express = require("express");
const jwt = require("jsonwebtoken");
const Commodity = require("../models/commodity");
const router = express.Router();

//Method to get all the stocks in your database. No duplicate stocks so query can be just be a find.
router.get("",(req, res) => {
  Commodity.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router;
