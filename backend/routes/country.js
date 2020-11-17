const express = require("express");
const jwt = require("jsonwebtoken");
const Country = require("../models/country");
const router = express.Router();

router.use("/:country", (req, res, next) => {
        Country.findOne({countryName: req.params.country}).then( country => {
            if (country) {
                res.status(200).json(country);
            } else {
                res.status(404).json({ message: "Stock not found!" });
            }
        });
    });

  module.exports = router;