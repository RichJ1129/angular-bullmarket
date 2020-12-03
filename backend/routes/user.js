const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    animal: "Bear",
    animalName: "Benny",
    happiness: "100"
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
        message: "Invalid authentication credentials!"
      });
    });i
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

//Update user animal
router.post("/updateAnimal", (req, res, next) => {
  User.updateOne({userName: req.body.userName}, {$set: {animal: req.body.userAnimal}})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      res.status(200).json({
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

//Update user animal name
router.post("/updateAnimalName", (req, res, next) => {
  User.updateOne({userName: req.body.userName}, {$set: {animalName: req.body.userAnimalName}})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      res.status(200).json({
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

//Update user's animal happiness
router.post("/updateHappiness", (req, res, next) => {
  User.updateOne({userName: req.body.userName}, {$set: {happiness: req.body.happiness}})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      res.status(200).json({
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

//Get users current animal
router.get("/getAnimal/:email", (req, res, next) => {
  User.findOne({email: req.params.email}).then( userAnimal => {
    if (userAnimal) {
      res.status(200).json(userAnimal['animal']);
    } else {
      res.status(404).json({ message: "User's Animal not found here!" });
    }
  });
});

//Get users current animal name
router.get("/getAnimalName/:email", (req, res, next) => {
  User.findOne({email: req.params.email}).then( userAnimalName => {
    if (userAnimalName) {
      res.status(200).json(userAnimalName['animalName']);
    } else {
      res.status(404).json({ message: "User's Animal Name not found here!" });
    }
  });
});

//Get users current animal happiness
router.get("/getAnimalHappiness/:email", (req, res, next) => {
  User.findOne({email: req.params.email}).then( userAnimalHappiness => {
    if (userAnimalHappiness) {
      res.status(200).json(userAnimalHappiness['happiness']);
    } else {
      res.status(404).json({ message: "Happiness not found here ;(!" });
    }
  });
});

//Get all users
//Method to get all the stocks in database. No duplicate stocks so query can be just be a find.
router.get("getAllUsers",(req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

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
