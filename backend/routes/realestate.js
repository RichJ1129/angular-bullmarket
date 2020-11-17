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


module.exports = router;