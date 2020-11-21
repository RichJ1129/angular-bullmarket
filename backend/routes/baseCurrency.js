const express = require("express");
const jwt = require("jsonwebtoken");
const Investment = require("../models/investment");
const router = express.Router();


router.get("", (req, res, next) => {
  Investment.find({userID: req.query.userID, symbol: req.query.baseCurrency},(error, data) => {
    if (error) {
        return next(error);
      } else {
        res.json(data);
      }
  });
});

module.exports = router;