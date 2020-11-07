const express = require("express");
const jwt = require("jsonwebtoken");
const Investment = require("../models/investment");
const router = express.Router();

router.get("",(req, res) => {
  Investment.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.post("",(req,res,next) => {
  const investment = new Investment ({
    userID: req.body.userID,
    name: req.body.name,
    symbol: req.body.symbol,
    purchasePrice: req.body.purchasePrice,
    shares: req.body.shares
  });
  console.log(investment);
  res.status(201).json({
    message: 'Investment Added Successfully'
  })
});


module.exports = router;