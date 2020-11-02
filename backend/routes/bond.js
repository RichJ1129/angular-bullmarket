const express = require("express");
const jwt = require("jsonwebtoken");
const Bond = require("../models/bond");
const router = express.Router();

//Method to get all the bonds in your database. No duplicate bonds so query can be just be a find.
router.get("",(req, res) => {
  Bond.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router;
