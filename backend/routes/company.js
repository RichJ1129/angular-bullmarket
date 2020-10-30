const express = require("express");
const jwt = require("jsonwebtoken");
const Company = require("../models/company");
const router = express.Router();

//Method to get a single company in the database.
router.get("/:ticker", (req, res, next) => {
  Company.findOne({companySymbol: req.params.ticker.toUpperCase()}).then( company => {
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: "Company information not found!" });
    }
  });
});


module.exports = router;
