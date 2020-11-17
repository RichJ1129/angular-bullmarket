const express = require("express");
const jwt = require("jsonwebtoken");
const Country = require("../models/country");
const router = express.Router();

router.get("country/:country", (req, res, next) => {
    console.log(req.params.country);
        Country.findOne({countryName: req.params.country}).then( (error, data) => {
            if (error) {
              return next(error);
          } else {
              res.json(data);
            }
        });
    });

  module.exports = router;