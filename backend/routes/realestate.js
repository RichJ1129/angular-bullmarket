const express = require("express");
const jwt = require("jsonwebtoken");
const Country = require("../models/country");
const router = express.Router();

router.get("",(req, res) => {
  Country.find((error, data) => {
    if (error) {
      return next(error);
  } else {
      res.json(data);
    }
  })
});

router.get("country-page/:country", (req, res, next) => {
  console.log(req.params.country());
  Country.findOne({countryName: req.params.country()}).then( country => {
    if (country) {
      res.status(200).json(country);
    } else {
      res.status(404).json({ message: "Country not found!" });
    }
  });
});

module.exports = router;