const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email
  });
  user.save().then(
    result => {
      res.status(201).json({
        message: "User created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//Get user by email address
router.get("/:email", (req, res, next) => {
  User.findOne({email: req.params.email}).then( email => {
    if (email) {
      res.status(200).json(email);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        process.env.JWT_KEY,
        {expiresIn: "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;
